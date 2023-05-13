//// bottom-up dynamic

// base case:
//
// dp[i][coins] -> max possible value if 'coins' coins are selected from the
// first 'i' piles
//
// dp[0][coins] = 0
//
// then, consider i > 0
//
// reduce to i - 1, may either take:
// 0 coins from i - 1 (rightmost) col, and coins from the leftmost i - 1 piles
// 1 coin from rightmost, coins - 1 from leftmost i - 1
// 2 from right, coins - 2 from leftmost i - 1
// ...
// currentCoins from rightmost, coins - currentCoins from leftmost i - 1
// ...
// 
// 
// let currentSum be the sum of currentCoins taken coins from the rightmost col
//
// When we have the optimal value for currentCoins:
// dp[i][coins] = dp[i - 1][coins - currentCoins] + currentSum
//
// currentCoins < piles[i-1].length && currentCoins < coins
//
// .: currentCoins < min(piles[i - 1].length, coins)
//
// DP transitions: dp[i][coins] is the maximum 
