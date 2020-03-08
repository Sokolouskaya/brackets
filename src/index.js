module.exports = function check(str, bracketsConfig) {
    const bracketsMapping = bracketsConfig.reduce((acc, [opened, closed]) => ({...acc, [closed]: opened}), {});
    const bracketsDuplicate = new Set(
        bracketsConfig
            .filter(([opened, closed]) => opened === closed)
            .map(([opened]) => opened)
    );

    const stack = [];

    for (let bracket of str) {
        const bracketOpposite = bracketsMapping[bracket];

        if (!bracketOpposite) {
            stack.push(bracket);
        } else {
            const last = stack.pop();

            if (last !== bracketOpposite) {
                if (bracketsDuplicate.has(bracketOpposite)) {
                    if (last) {
                        stack.push(last);
                    }

                    stack.push(bracket);
                } else {
                    return false;
                }
            }
        }
    }

    return stack.length === 0;
};
