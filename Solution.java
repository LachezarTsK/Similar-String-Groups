
import java.util.stream.IntStream;

public class Solution {

    public int numSimilarGroups(String[] inputWords) {

        UnionFind unionFind = new UnionFind(inputWords.length);
        int totalGroupsOfConnectedComponents = inputWords.length;

        for (int i = 0; i < inputWords.length; ++i) {
            for (int j = i + 1; j < inputWords.length; ++j) {

                if (wordsAreSimilar(inputWords[i], inputWords[j])) {

                    int parentFirst = unionFind.findParent(i);
                    int parentSecond = unionFind.findParent(j);

                    if (parentFirst != parentSecond) {
                        unionFind.join(parentFirst, parentSecond);
                        --totalGroupsOfConnectedComponents;
                    }
                }
            }
        }

        return totalGroupsOfConnectedComponents;
    }

    private boolean wordsAreSimilar(String firstWord, String secondWord) {
        int numberOfMisplacedLetters = 0;
        for (int i = 0; i < firstWord.length() && numberOfMisplacedLetters < 3; ++i) {
            if (firstWord.charAt(i) != secondWord.charAt(i)) {
                ++numberOfMisplacedLetters;
            }
        }
        return numberOfMisplacedLetters == 0 || numberOfMisplacedLetters == 2;
    }
}

class UnionFind {

    //by this particular problem there is no need to implement an array for ranks.
    //the ID of the parent can be applied as a rank.
    int[] parent;

    UnionFind(int totalWords) {
        parent = IntStream.range(0, totalWords).toArray();
    }

    int findParent(int index) {
        if (parent[index] != index) {
            index = findParent(parent[index]);
        }
        return parent[index];
    }

    void join(int first, int second) {
        if (parent[first] > parent[second]) {
            parent[second] = first;
        } else {
            parent[first] = second;
        }
    }
}
