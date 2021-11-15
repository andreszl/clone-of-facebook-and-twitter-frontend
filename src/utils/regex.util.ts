export const VALID_EMAIL = /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i;
export const ONLY_LETTERS = /^[a-zA-Z\s]*$/;
export const ONLY_LETTERS_AND_NUMBERS = /^[a-zA-Z0-9 ]*$/;
export const ONLY_LETTERS_AND_DASHES = /^[a-zA-Z0-9\-]*$/;
export const ONLY_NUMBERS_AND_DASHES = /^[0-9\-]*$/;
export const ONLY_DASH_ON_MIDDLE = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
export const ONLY_NUMBERS = /^\d+$/;
export const ONLY_INTEGERS = /^[0-9]+$/;
export const JUST_A_DASH = /([\-])\1{1,}/;
export const ONLY_NUMBERS_WITH_OR_WITHOUT_DECIMALS = /^[0-9]{1,}([.][0-9]{1,})?$/;

export const HAS_PREFIX_WITH_PARENTHESIS = /^(\x28\x2B_PREFIX_\x29)(\d+(\.\d{10})*)/;
export const HAS_PREFIX_WITH_PLUS = /^(\x2B_PREFIX_)(\d+(\.\d{10})*)/;
export const HAS_PREFIX = /^(_PREFIX_)(\d+(\.\d{10})*)/;
export const HAS_SPACES = /^[\s]/;
