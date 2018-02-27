package com.poster.utils;

public class MyException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private ErrorCode errorCode;
	
	public MyException(String msg) {
		super(msg);
	}
	
	public MyException(String msg, Throwable e) {
		super(msg, e);
	}
	
	public MyException(ErrorCode errorCode) {
		super(errorCode.memo);
		this.errorCode = errorCode;
	}
	
	public ErrorCode getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(ErrorCode errorCode) {
		this.errorCode = errorCode;
	}
}
