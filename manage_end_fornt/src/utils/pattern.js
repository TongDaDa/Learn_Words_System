/**
 * Created by liutong on 17/8/25.
 *
 */
export const captcha = /^\d{6}$/;

export const phone = /^1(3|4|5|7|8)\d{9}$/;

export const password = /^[\S]{1,30}$/;

export const userName = /^[\S]{1,100}$/;

export const noEmpty = /^[\S]*$/;

export const price = /^\d+((\.|\。)\d{0,2})?$/;

export const dateString = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/


/* 基础类型验证 */
