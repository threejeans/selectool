package com.selectool.repository;

import com.selectool.entity.Code;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CodeRepo extends CrudRepository<Code, String> {
}
