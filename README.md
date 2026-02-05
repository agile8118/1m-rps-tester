# Overview

This repository contains the code that we used for the final colossal test that we ran in the [Handling 1 Million Requests per Second Video](https://youtu.be/W4EwfEU8CGA).

### Test structure:

**Server**: 1 c8gn.48xlarge instance with the following config and cost:

    - 192 CPU cores
    - 384 GB RAM
    - 600 Gb/s (75 GB/s)
    - $11/h or $8,300/month

**Testers**: 60 c8gn.2xlarge instances with the following config and cost:

    - 8 CPU cores
    - 16 GB RAM
    - Up to 50 Gigabit
    - 60 * $0.474 = $28.44/h or $20,000/month

To see the C++ code that the server was running during the test, please refer to this [repository](https://github.com/agile8118/cpp-1m-rps).

### Results:

[30min-60-results.txt](30min-60-results.txt) file is the results of the autocannon script that was run on all 60 test machines for 30 minutes.

This is the cleanest result that I could get after running the test a few times. No timeout errors, and also all the servers started at the same time. In total you can see that in **30 minutes**, we transferred a whopping **67.81 terabytes** of data, and handled **2,074,672,000** requests.

Look at the [commands.sh](commands.sh) file to see how we ran the tests and grabbed the output.

(costs in USD)
