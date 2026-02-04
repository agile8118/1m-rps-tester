# These are the commands that were used in the video to run the benchmark tests

aws logs tail /aws/ssm/benchmarks --follow

aws ssm send-command \
    --targets "Key=tag:Name,Values=Tester" \
    --document-name "AWS-RunShellScript" \
    --comment "Run Benchmark" \
    --max-concurrency "100%" \
    --max-errors "50%" \
    --output-s3-bucket-name "benchmark-results-bucket-cododev" \
    --cloud-watch-output-config "CloudWatchOutputEnabled=true,CloudWatchLogGroupName=/aws/ssm/benchmarks" \
    --parameters 'commands=["cd /home/ec2-user/ && node 1m-rps-tester/patch.js 400 180 5 6 3000 ec2-3-149-144-133.us-east-2.compute.amazonaws.com"]' \
    --query "Command.CommandId" \
    --output text

aws ssm send-command \
    --targets "Key=tag:Name,Values=Tester" \
    --document-name "AWS-RunShellScript" \
    --comment "Grab Result" \
    --max-concurrency "100%" \
    --max-errors "50%" \
    --output-s3-bucket-name "benchmark-results-bucket-cododev" \
    --cloud-watch-output-config "CloudWatchOutputEnabled=true,CloudWatchLogGroupName=/aws/ssm/benchmarks" \
    --parameters 'commands=["cd /home/ec2-user && cat results.txt"]' \
    --query "Command.CommandId" \
    --output text


aws ssm cancel-command --command-id <command-id>


aws s3 sync s3://benchmark-results-bucket-cododev/<command-id>/ ./results/
find ./results -path "*/stdout" -exec cat {} + > 30min-60-results.txt


grep "read" 30min-60-results.txt | wc -l
grep "read" 30min-60-results.txt | awk '{req += $1; tb += $5} END {print "Total Requests: " req "k"; print "Total Data Read: " tb " TB"}'
grep "errors" 30min-60-results.txt
grep "errors" 30min-60-results.txt | awk '{print $1}'





