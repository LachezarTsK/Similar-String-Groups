
#include <memory>
#include <vector>
using namespace std;

class UnionFind {
    
    //by this particular problem there is no need to implement a vector for ranks.
    //the ID of the parent can be applied as a rank.
    vector<int> parent;

public:
    explicit UnionFind(int totalWords) {
        parent.resize(totalWords);
        iota(parent.begin(), parent.end(), 0);
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
};

class Solution {
    
public:
    int numSimilarGroups(const vector<string>& inputWords) const {
        unique_ptr<UnionFind> unionFind = make_unique<UnionFind>(inputWords.size());
        int totalGroupsOfConnectedComponents = inputWords.size();

        for (int i = 0; i < inputWords.size(); ++i) {
            for (int j = i + 1; j < inputWords.size(); ++j) {

                if (wordsAreSimilar(inputWords[i], inputWords[j])) {

                    int parentFirst = unionFind->findParent(i);
                    int parentSecond = unionFind->findParent(j);

                    if (parentFirst != parentSecond) {
                        unionFind->join(parentFirst, parentSecond);
                        --totalGroupsOfConnectedComponents;
                    }
                }
            }
        }
        return totalGroupsOfConnectedComponents;
    }

private:
    bool wordsAreSimilar(const string& firstWord, const string& secondWord) const {
        int numberOfMisplacedLetters = 0;
        for (int i = 0; i < firstWord.length() && numberOfMisplacedLetters < 3; ++i) {
            if (firstWord[i] != secondWord[i]) {
                ++numberOfMisplacedLetters;
            }
        }
        return numberOfMisplacedLetters == 0 || numberOfMisplacedLetters == 2;
    }
};
