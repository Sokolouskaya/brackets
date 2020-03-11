module.exports = function check(str, bracketsConfig) {
    let bracketsMapping = {};
    for (let config of bracketsConfig) {
        bracketsMapping[config[1]] = config[0];
    }

    let bracketsDuplicate = findDuplicates(bracketsConfig);

    let stack = [];

    for (let bracket of str) {
        let bracketOpposite = bracketsMapping[bracket];

        if (!bracketOpposite) {
            stack.push(bracket);
        } else {
            let last = stack.pop();

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


function findDuplicates(bracketsConfig) {
    let set = new Set();
    for (let config of bracketsConfig) {
        if (config[1] === config[0]) {
            set.add(config[1])
        }
    }
    return set;
}
