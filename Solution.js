
/**
 * @param {string[]} inputWords
 * @return {number}
 */
var numSimilarGroups = function (inputWords) {
    const unionFind = new UnionFind(inputWords.length);
    let totalGroupsOfConnectedComponents = inputWords.length;

    for (let i = 0; i < inputWords.length; ++i) {
        for (let j = i + 1; j < inputWords.length; ++j) {

            if (wordsAreSimilar(inputWords[i], inputWords[j])) {

                let parentFirst = unionFind.findParent(i);
                let parentSecond = unionFind.findParent(j);

                if (parentFirst !== parentSecond) {
                    unionFind.join(parentFirst, parentSecond);
                    --totalGroupsOfConnectedComponents;
                }
            }
        }
    }
    return totalGroupsOfConnectedComponents;
};

/**
 * @param {string} firstWord
 * @param {string} secondWord 
 * @return {boolean}
 */
function wordsAreSimilar(firstWord, secondWord) {
    let numberOfMisplacedLetters = 0;
    for (let i = 0; i < firstWord.length && numberOfMisplacedLetters < 3; ++i) {
        if (firstWord.charAt(i) !== secondWord.charAt(i)) {
            ++numberOfMisplacedLetters;
        }
    }
    return numberOfMisplacedLetters === 0 || numberOfMisplacedLetters === 2;
}

class UnionFind {

    /**
     * @param {number} totalWords
     */
    constructor(totalWords) {
        //by this particular problem there is no need to implement an array for ranks.
        //the ID of the parent can be applied as a rank.
        this.parent = Array.from(Array(totalWords).keys());
    }

    /**
     * @param {number} index
     * @return {number}
     */
    findParent(index) {
        if (this.parent[index] !== index) {
            index = this.findParent(this.parent[index]);
        }
        return this.parent[index];
    }

    /**
     * @param {number} first
     * @param {number} second 
     * @return {void}
     */
    join(first, second) {
        if (this.parent[first] > this.parent[second]) {
            this.parent[second] = first;
        } else {
            this.parent[first] = second;
        }
    }
}
