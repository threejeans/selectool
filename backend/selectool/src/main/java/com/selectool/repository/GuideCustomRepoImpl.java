package com.selectool.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.selectool.dto.guide.filter.GuideFilter;
import com.selectool.entity.Guide;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.selectool.entity.QCorp.corp;
import static com.selectool.entity.QGuide.guide;
import static com.selectool.entity.QGuideCategory.guideCategory;
import static org.springframework.util.StringUtils.hasText;

@Repository
public class GuideCustomRepoImpl implements GuideCustomRepo {
    private final JPAQueryFactory jpaQueryFactory;

    public GuideCustomRepoImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<Guide> searchByFilter(GuideFilter filter) {
        return jpaQueryFactory
                .selectFrom(guide)
                .where(
                        toolNameContains(filter.getToolName()),
                        funcEq(filter.getFunc()),
                        categoryIn(filter.getCategories())
                )
                .fetch();
    }

    private BooleanExpression toolNameContains(String toolName) {
        return hasText(toolName) ? guide.toolName.contains(toolName) : null;
    }

    private BooleanExpression funcEq(String func) {
        return hasText(func) ? guide.func.eq(func) : null;
    }

    private BooleanExpression categoryIn(List<String> categories) {
        return categories.isEmpty() ? null :
                guide.id.in(
                        JPAExpressions
                                .selectDistinct(guideCategory.guide.id)
                                .from(guideCategory)
                                .where(guideCategory.name.in(categories))
                );
    }
}
