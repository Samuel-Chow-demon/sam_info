

function conditionalStyle(condition, styleObj, defaultObj = {})
{
    return condition ? styleObj : defaultObj;
}

export {conditionalStyle};