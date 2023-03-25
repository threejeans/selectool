package com.selectool.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.selectool.dto.corp.filter.CorpFilter;
import com.selectool.entity.Corp;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.selectool.entity.QCorp.corp;
import static com.selectool.entity.QCorpCategory.corpCategory;
import static org.springframework.util.StringUtils.hasText;

@Repository
public class CorpCustomRepoImpl implements CorpCustomRepo {
    private final JPAQueryFactory jpaQueryFactory;

    public CorpCustomRepoImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<Corp> searchByFilter(CorpFilter filter) {
        return jpaQueryFactory
                .selectFrom(corp)
                .where(
                        nameContains(filter.getName()),
                        categoryIn(filter.getCategories())
                )
                .fetch();
    }

    private BooleanExpression nameContains(String name) {
        return hasText(name) ? corp.nameKr.contains(name).or(corp.nameEn.containsIgnoreCase(name)) : null;
    }

    private BooleanExpression categoryIn(List<String> categories) {
        return categories.isEmpty() ? null :
                corp.id.in(
                        JPAExpressions
                                .selectDistinct(corpCategory.corp.id)
                                .from(corpCategory)
                                .where(corpCategory.name.in(categories))
                );
    }
}
