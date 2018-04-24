#include<iostream>
#include<string>
#include <limits>
using namespace std;

void CalcAllPermutation(char* perm, int from, int to) {
      if (to <= 1) {
            return;
        }
        if (from == to) {
            for (int i = 0; i<=to; i++) {
                cout << perm[i];
            }
            cout << endl;
        }
        else {
            for (int j = from; j<=to; j++) {
                swap(perm[j],perm[from]);
                CalcAllPermutation(perm,from+1,to);
            }
            swap(perm[j],perm[from]);
        }
}

int main(){
    CalcAllPermutation("abc",0,2);
}
