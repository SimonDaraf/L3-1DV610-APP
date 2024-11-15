# Manual Tests

## Introduction
The tests must be performed on a deployed instance.
Each case will be done four times to evaluate a consistency. If any repetition on a case fails, the rest of the cases are still evaluated.
Date and performer must be documented.

## Template
| Iteration | Condition | Player Hand | Dealer Hand | Status | Note |
|-----------|-----------|-------------|-------------|--------|------|
|           |           |             |             |        |      |

## Test - Simon Danielsson - 15/11/2024

### Case 01: Player has blackjack

| Iteration | Condition | Player Hand | Dealer Hand | Status | Note |
|-----------|-----------|-------------|-------------|--------|------|
|1| Player has blackjack | Q, A | 7, A | 🔸 | Player recieved 1.5 funds when 1 was betted. This needs to be rounded up to avoid potential softlock. |
|2| Player has blackjack | A, Q | 7, 9, 2 | ✅ | The can still take cards even after the player has blackjack. This doesn't affect the outcome, but it looks weird. |
|3| Player has blackjack | J, A | 3, Q, 7 | ✅ | -=- |
|4| Player has blackjack | J, A | J, 6, 10 | ✅ | -=- |

### Case 02: Player has lost a round

| Iteration | Condition | Player Hand | Dealer Hand | Status | Note |
|-----------|-----------|-------------|-------------|--------|------|
|1| Player has lost a round | 4, 3 | Q, K | ✅ | -=- |
|2| Player has lost a round | 7, 10 | 10, Q | ✅ | -=- |
|3| Player has lost a round | J, 6, J | K | ✅ | When player is busted, the dealer skips their turn, works correctly. |
|4| Player has lost a round | 6, 10 | 8, J | ✅ | -=- |

### Case 03: Player has won a round

| Iteration | Condition | Player Hand | Dealer Hand | Status | Note |
|-----------|-----------|-------------|-------------|--------|------|
|1| Player has won a round | 9, K | 4, Q, 3 | ✅ | -=- |
|2| Player has won a round | J, 5 | 8, 7, 8 | ✅ | -=- |
|3| Player has won a round | J, K | Q, 6, A | ✅ | -=- |
|4| Player has won a round | J, 5 | 8, 7, 8 | ✅ | -=- |

### Case 04: Player has lost the game

| Iteration | Condition | Status | Note |
|-----------|-----------|------|
|1| Player has lost the game | ✅ | When the funds ran out the game ended. |

### Case 05: Dealer has blackjack

| Iteration | Condition | Player Hand | Dealer Hand | Status | Note |
|-----------|-----------|-------------|-------------|--------|------|
|1| Dealer has blackjack | 9, 6 | A, 10 | ✅ | -=- |
|2| Dealer has blackjack | 10, 8 | J, A | ✅ | -=- |
|3| Dealer has blackjack | 5, 10 | A, J | ✅ | -=- |
|4| Dealer has blackjack | 5, J | K, A | ✅ | -=- |

### Case 06: Dealer has lost round

| Iteration | Condition | Player Hand | Dealer Hand | Status | Note |
|-----------|-----------|-------------|-------------|--------|------|
|1| Dealer has lost round | A, 10 | 9, 3, 5 | ✅ | -=- |
|2| Dealer has lost round | K, 10 | Q, 9 | ✅ | -=- |
|3| Dealer has lost round | 8, 10 | J, 6, 7 | ✅ | -=- |
|4| Dealer has lost round | K, 9 | K, 8 | ✅ | -=- |

### Case 07: Dealer has won the round

| Iteration | Condition | Player Hand | Dealer Hand | Status | Note |
|-----------|-----------|-------------|-------------|--------|------|
|1| Dealer has won the round | 4, 5 | A, 5, 3 | ✅ | -=- |
|2| Dealer has won the round | 7, 7 | 2, J, 9 | ✅ | -=- |
|3| Dealer has won the round | 4, 3, 2, Q, 6 | 4 | ✅ | -=- |
|4| Dealer has won the round | 7, 4, 3, 5 | 9, 2, Q | ✅ | -=- |

### Case 08: Result is draw

| Iteration | Condition | Player Hand | Dealer Hand | Status | Note |
|-----------|-----------|-------------|-------------|--------|------|
|1| Result is draw | 2, 9, 10 | 5, 2, 3, 4, 7 | ✅ | -=- |
|2| Result is draw | 2, 8, J | 5, 5, 6, 4 | ✅ | -=- |
|3| Result is draw | 7, J | 4, 9, 4 | ✅ | -=- |
|4| Result is draw | 2, 6, A | 10, 9 | ✅ | -=- |

### Case 09: Funds

| Iteration | Condition | Bet placed | Amount back | Status | Note |
|-----------|-----------|-------------|-------------|--------|------|
|1| Blackjack, player gets 2.5x | |  | ✅ | -=- |
|2| Player wins, player gets 2x | 10 | 20 | ✅ | -=- |
|3| Dealer wins, player loses bet | 10 | 0 | ✅ | -=- |
|4| Draw, player gest their bet back | 10 | 3970 | ❌ | Funds after bet was 40, bet placed 10, final sum 4010. I think I see the potential issue. |