import { black, primary, success, warning } from "./colors";

export const borderRadius = '34px'
export const borderRadius2 = '14px'

export const shadow = {
    elevation: 10,
    boxShadow: `1px 2px 3px ${black}`,
    shadowOpacity: 0.25
}

export const shadowPrimary = {
    elevation: 10,
    boxShadow: `0px 3px 5px ${primary}`,
    shadowOpacity: 1
}

export const shadowSuccess = {
    elevation: 10,
    boxShadow: `0px 3px 5px ${success}`,
    shadowOpacity: 1
}

export const shadowWarning = {
    elevation: 10,
    boxShadow: `0px 3px 5px ${warning}`,
    shadowOpacity: 1
}