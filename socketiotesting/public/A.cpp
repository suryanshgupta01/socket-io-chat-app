#include <bits/stdc++.h>
using namespace std;
#define loop(i, a, b) for (int i = a; i < b; i++)
#define rloop(i, a, b) for (int i = b - 1; i >= a; i--)
#define ll long long int
#define ln cout << '\n';
#define R cin >>
#define PB(a) push_back(a);
#define all(x) (x).begin(), (x).end()
#define br break;
#define cn continue;
#define yes cout << "YES\n";
#define no cout << "NO\n";
#define minheap priority_queue<long long, vector<long long>, greater<long long>>
#define maxheap priority_queue<long long>
#define F first
#define S second
#define vi vector<ll>
#define vvi vector<vector<ll>>
const int N = 1e5 + 10;
const int MOD = 1e9 + 7;
vector<ll> dp(N, -1);

int main()
{
    int t;
    cin >> t;
    while (t--)
    {
        bool flag = false;
        ll count = 0;
        ll ans = 0;
        ll sum = 0;
        ll zero = 0;
        ll one = 0;
        ll mini = INT_MAX;
        ll maxi = INT_MIN;

        string s;
        ll n, m, x, y, z, a, b, c;
        R n;
        // R m;
        ll arr[n];
        vi v;
        multiset<ll> ms;
        map<ll, ll> mp;
        // loop(i, 0, n) {R arr[i]; v.push_back(arr[i]); mp[arr[i]]++; ms.insert(arr[i]);}
    }
}