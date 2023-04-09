package com.selectool.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.selectool.dto.tool.filter.ToolFilter;
import com.selectool.entity.Tool;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.selectool.entity.QTool.tool;
import static com.selectool.entity.QToolCategory.toolCategory;
import static org.springframework.util.StringUtils.hasText;

@Repository
public class ToolCustomRepoImpl implements ToolCustomRepo {
    private final JPAQueryFactory jpaQueryFactory;

    public ToolCustomRepoImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<Tool> searchByFilter(ToolFilter filter) {
        NumberPath<Long> aliasQuantity = Expressions.numberPath(Long.class, "quantity");

        return jpaQueryFactory
                .selectFrom(tool)
                .where(
                        nameContains(filter.getName()),
                        countryEq(filter.getCountry()),
                        categoryIn(filter.getCategories()),
                        trialEq(filter.getOnlyTrial())
                )
                .orderBy(getOrderSpecifier(filter.getOrderTarget()))
                .fetch();
    }



    private BooleanExpression nameContains(String name) {
        return hasText(name) ? tool.nameKr.contains(name).or(tool.nameEn.containsIgnoreCase(name)) : null;
    }

    private BooleanExpression countryEq(String country) {
        return hasText(country) ? tool.country.eq(country) : null;
    }

    private BooleanExpression categoryIn(List<String> categories) {
        return categories.isEmpty() ? null :
                tool.id.in(
                        JPAExpressions
                                .selectDistinct(toolCategory.tool.id)
                                .from(toolCategory)
                                .where(toolCategory.name.in(categories))
                );
    }

    private BooleanExpression trialEq(Boolean onlyTrial) {
        return onlyTrial ? tool.trial.eq(true) : null;
    }

    private OrderSpecifier[] getOrderSpecifier(String orderTarget) {

        List<OrderSpecifier> orderSpecifiers = new ArrayList<>();

        switch (orderTarget){
            case "bookmark":
                orderSpecifiers.add(new OrderSpecifier(Order.DESC, tool.toolBookmarks.size()));
            case "name":
            default:
                orderSpecifiers.add(new OrderSpecifier(Order.ASC, tool.nameKr));
        }

        return orderSpecifiers.toArray(new OrderSpecifier[orderSpecifiers.size()]);
    }
}
