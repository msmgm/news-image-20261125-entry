# Wednesday 25 November 2026: Fourteen Stories on One Front Page

[![Bounty](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125) [![Rank](https://make.fun/badge/news-image-20261125/msmgm/news-image-20261125-entry/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125) [![Reward](https://make.fun/badge/news-image-20261125/msmgm/news-image-20261125-entry/reward.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

## Overview

1. Asian stocks tumble as fresh US tariff threats hit chip-heavy markets
2. Australia signs a security pact making it Solomon Islands' defence partner of choice
3. Russia and Ukraine agree a large prisoner exchange in US-brokered talks
4. Spain hit by its first general strike in 14 years over housing and living costs
5. Trump administration readies new tariffs after a probe of excess capacity in 16 partners
6. Shanghai party chief Chen Jining put under anti-graft investigation
7. Citigroup weighs a return to Venezuela five years after exiting
8. Oil falls as supply glut concerns offset Middle East disruption fears
9. CAS reinstates Senegal as AFCON champions, restoring the 1-0 win over Morocco
10. Vaibhav Suryavanshi hits the fastest List A century, 100 off 28 balls
11. NATO vows defence against the space threat after Russian nuclear satellite reports
12. UK sanctions top Myanmar military leaders after the Rohingya genocide ruling
13. Gaza tent cities flooded as rains hit
14. Microsoft declares Code Red after a historic outage

## Assets and Implementation

`entry.png` is a 1024 by 1024 JPEG newspaper image summarizing the world news of Wednesday 25 November 2026, with a one-line sub-headline under each of the nine main headlines; `main.ts` is a Node 22 standard-library script that validates `entry.png` against the competition gate (size at most 1048576 bytes, valid PNG or JPEG format, dimensions at most 1024x1024) and copies it byte-for-byte, throwing an Error and copying nothing if any gate fails.

## Run and Verify Locally

```bash
mkdir out1 out2
MAKEFUN_OUTPUT_DIR=out1 node main.ts
MAKEFUN_OUTPUT_DIR=out2 node main.ts
sha256sum out1/entry.png out2/entry.png entry.png
rm -rf out1 out2
```

## License

See LICENSE.
