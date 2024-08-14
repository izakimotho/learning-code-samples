package com.test.sampleApp.repository;

import com.test.sampleApp.models.Cookie;
import org.springframework.data.repository.CrudRepository;

public interface CookieRepository extends CrudRepository<Cookie, Long> {
}
