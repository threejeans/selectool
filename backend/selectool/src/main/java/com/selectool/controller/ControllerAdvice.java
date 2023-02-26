package com.selectool.controller;

import com.selectool.dto.Message;
import com.selectool.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerAdvice {
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    public Message NotFoundException(RuntimeException runtimeException) {
        return new Message(runtimeException.getMessage());
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(DuplicateException.class)
    public Message DuplicationException(RuntimeException runtimeException) {
        return new Message(runtimeException.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({BadRequestException.class, WrongFormException.class})
    public Message BadRequestException(RuntimeException runtimeException) {
        return new Message(runtimeException.getMessage());
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler({WrongAccessException.class, NotAuthorizedException.class})
    public Message WrongAccessException(RuntimeException runtimeException) {
        return new Message(runtimeException.getMessage());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(InternalServerErrorException.class)
    public Message InternalServerErrorException(RuntimeException runtimeException) {
        return new Message(runtimeException.getMessage());
    }
}
/*
TODO 여러개 쓸 때는 이렇게
@ExceptionHandler({BadRequestException.class, NotEqualException.class, WrongFormException.class})
 */
