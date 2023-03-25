package com.selectool.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.selectool.dto.tool.filter.ToolFilter;
import com.selectool.entity.Tool;
import org.springframework.stereotype.Repository;

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
        return jpaQueryFactory
                .selectFrom(tool)
                .where(
                        nameContains(filter.getName()),
                        countryEq(filter.getCountry()),
                        categoryIn(filter.getCategories())
                )
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
}
