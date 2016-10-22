# swf-metrics

> Introspective metrics and breakdowns of pending and finished AWS Simple Workflow executions.

# Installation

## Install locally
```
$ npm install
```

## Run with Docker
Ensure the following environment variables are set:

* AWS_DEFAULT_REGION
* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY

```
$ docker build -t swf-metrics .

$ docker run --rm -it \
    --name swf-metrics \
    -e AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION \
    -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
    swf-metrics
```

# Use

```bash
$ swf-metrics <command> --domain <domain> [options]

Commands:
  failed [--no-breakdown]  Display metrics about failed workflows.
  pending                  Display metrics about pending workflows.
  completed                Display metrics about completed workflows.

Options:
  --domain          SWF domain to get metrics from           [string] [required]
  --duration        Duration of time of data to retrieve since the value of
                    --since. Eg: 6hours, 1day, etc.
                                                  [string] [default: [1,"hour"]]
  --workflow-id     Retrieve the metrics only for a given workflow.     [string]
  --time-threshold  Hide time measures which value is below this number of
                    seconds.                               [number] [default: 1]
  --since           Position in time from which we start retrieving the history
                    of data.      [string] [default: "2016-10-12T17:04:03.551Z"]
  --help            Show help                                          [boolean]
  --version         Show version number                                [boolean]
```

## Failed workflows

```
$ swf-metrics failed --domain <swf-domain>

╔════════════════════════════╤═══════╤══════════╤══════════╤═══════════╗
║ Activity                   │ # All │ # Failed │ % Failed │ ≠ Reasons ║
╟────────────────────────────┼───────┼──────────┼──────────┼───────────╢
║ RenderHtml 20150917        │   479 │      452 │    92.81 │        10 ║
╟────────────────────────────┼───────┼──────────┼──────────┼───────────╢
║ Summariser 20160218        │    27 │       17 │     3.49 │        12 ║
╟────────────────────────────┼───────┼──────────┼──────────┼───────────╢
║ SerializeMetadata 20150107 │   497 │        6 │     1.23 │         1 ║
╟────────────────────────────┼───────┼──────────┼──────────┼───────────╢
║ Seriousness 20150106       │    27 │        3 │     0.62 │         1 ║
╟────────────────────────────┼───────┼──────────┼──────────┼───────────╢
║ ReadingEase 20150310       │    27 │        3 │     0.62 │         1 ║
╟────────────────────────────┼───────┼──────────┼──────────┼───────────╢
║ Perspective 20150310       │    27 │        3 │     0.62 │         1 ║
╟────────────────────────────┼───────┼──────────┼──────────┼───────────╢
║ Categories 20150331        │    27 │        3 │     0.62 │         1 ║
╚════════════════════════════╧═══════╧══════════╧══════════╧═══════════╝

╔══════════════════════════════════════════════════════════════╤═════╤════════╤══════════════════════════════════════╗
║ Failure Reason                                               │   # │      % │ Workflow Ids                         ║
╟──────────────────────────────────────────────────────────────┼─────┼────────┼──────────────────────────────────────╢
║ RenderHtml 20150917 Received error code 1                    │ 407 │  90.04 │ 6d1187e8-1aa5-466e-ad79-61f7c7eeee7d ║
║                                                              │     │        │ dd782c43-5ef9-42df-86a7-013092dba3d6 ║
║                                                              │     │        │ d66de93e-a41a-4dde-892d-1d1444110600 ║
║                                                              │     │        │ 928a04be-918c-4aea-a738-1c67fbbe3247 ║
║                                                              │     │        │ ec28c509-d0b1-43fa-8649-fae42cc22691 ║
║                                                              │     │        │ e3afabda-eb6f-47ba-aa1c-169e199323cc ║
║                                                              │     │        │ f5649c0d-50e9-4da7-877f-a063c3503bfe ║
║                                                              │     │        │ 066a24cc-8413-4d2a-b0e8-0b95d8269864 ║
║                                                              │     │        │ a91f352f-77b6-49ed-9525-c90b7e78397d ║
║                                                              │     │        │ bcde80dd-d6a1-4855-81f9-c5a08769fb3d ║
╟──────────────────────────────────────────────────────────────┼─────┼────────┼──────────────────────────────────────╢
║ SerializeMetadata 20150107 UNTRAPPED ERROR: Unable to determ │   6 │ 100.00 │ d214f812-a76b-4c9e-950e-7ba46864c606 ║
║ ine callback_url for execution <workflow-id>/app/bin/worker: │     │        │ 2e021784-93e1-44ef-9539-9d09caa3fc8e ║
║ 27:in `handle'/app/.gems/gems/freebird_workflow-0.5.10/lib/f │     │        │ 4befff3f-8c9b-44e9-95ae-265a124e03b0 ║
║ reebird_workflow/worker.rb:29:in `block in start'/app/.gems/ │     │        │ 68ea5d47-bdbe-436f-98f4-e9994247a756 ║
║ gems/aws-sdk-v1-1.66.0/lib/aws/simple_workflow/activity_task │     │        │ b6d85325-677d-46eb-a04b-ab7cfb7bac08 ║
║ _collection.rb:112:in `block (2 levels) in poll'/app/.gems/g │     │        │ 666397fb-94ea-40f2-9593-74451a6d69dd ║
║ ems/aws-sdk-v1-1.66.0/lib/aws/simple_workflow/activity_task_ │     │        │                                      ║
║ collection.rb:86:in `poll_for_single_task'/app/.gems/gems/aw │     │        │                                      ║
║ s-sdk-v1-1.66.0/lib/aws/simple_workflow/activity_task_collec │     │        │                                      ║
║ tion.rb:111:in `block in poll'/app/.gems/gems/aws-sdk-v1-1.6 │     │        │                                      ║
║ 6.0/lib/aws/simple_workflow/activity_task_collection.rb:109: │     │        │                                      ║
║ in `loop'/app/.gems/gems/aws-sdk-v1-1.66.0/lib/aws/simple_wo │     │        │                                      ║
║ rkflow/activity_task_collection.rb:109:in `poll'/app/.gems/g │     │        │                                      ║
║ ems/freebird_workflow-0.5.10/lib/freebird_workflow/worker.rb │     │        │                                      ║
║ :25:in `start'/app/bin/worker:41:in `<top (required)>'/var/l │     │        │                                      ║
║ ib/gems/2.1.0/gems/bundler-1.13.0/lib/bundler/cli/exec.rb:74 │     │        │                                      ║
║ :in `load'/var/lib/gems/2.1.0/gems/bundler-1.13.0/lib/bundle │     │        │                                      ║
║ r/cli/exec.rb:74:in `kernel_load'/var/lib/gems/2.1.0/gems/bu │     │        │                                      ║
║ ndler-1.13.0/lib/bundler/cli/exec.rb:27:in `run'/var/lib/gem │     │        │                                      ║
║ s/2.1.0/gems/bundler-1.13.0/lib/bundler/cli.rb:332:in `exec' │     │        │                                      ║
║ /var/lib/gems/2.1.0/gems/bundler-1.13.0/lib/bundler/vendor/t │     │        │                                      ║
║ hor/lib/thor/command.rb:27:in `run'/var/lib/gems/2.1.0/gems/ │     │        │                                      ║
║ bundler                                                      │     │        │                                      ║
```

## Completed workflows

```bash
$ swf-metrics completed --domain <swf-domain>
╔════════════════════════════╤══════╤════════╤═════════╤══════════╤════════╗
║ Activity                   │    # │  Start │ Respond │ Complete │ Finish ║
╟────────────────────────────┼──────┼────────┼─────────┼──────────┼────────╢
║ SerializeMetadata 20150107 │ 1609 │ 66.53s │       - │        - │ 66.89s ║
╟────────────────────────────┼──────┼────────┼─────────┼──────────┼────────╢
║ ReadingEase 20150310       │ 1058 │ 41.73s │   2.71s │        - │ 44.65s ║
╟────────────────────────────┼──────┼────────┼─────────┼──────────┼────────╢
║ MainProtagonist 20160420   │ 1050 │ 54.08s │       - │        - │ 54.92s ║
╟────────────────────────────┼──────┼────────┼─────────┼──────────┼────────╢
║ ReadingTime 20150108       │ 1058 │ 41.64s │       - │        - │ 42.90s ║
╟────────────────────────────┼──────┼────────┼─────────┼──────────┼────────╢
║ PronounCount 20150113      │ 1058 │ 41.42s │       - │        - │ 42.32s ║
╟────────────────────────────┼──────┼────────┼─────────┼──────────┼────────╢
║ MediaCount 20150108        │ 1058 │ 41.65s │       - │        - │ 42.56s ║
╟────────────────────────────┼──────┼────────┼─────────┼──────────┼────────╢
║ Seriousness 20150106       │ 1058 │ 41.57s │       - │        - │ 42.82s ║
╟────────────────────────────┼──────┼────────┼─────────┼──────────┼────────╢
║ ExtractBody 20141218       │ 1058 │ 37.72s │       - │        - │ 38.61s ║
╟────────────────────────────┼──────┼────────┼─────────┼──────────┼────────╢
║ BasicMetadata 20151130     │ 1058 │ 37.72s │   3.48s │        - │ 41.72s ║
╟────────────────────────────┼──────┼────────┼─────────┼──────────┼────────╢
║ MobileFriendly 20150708    │ 1058 │ 37.72s │       - │        - │ 38.89s ║
╟────────────────────────────┼──────┼────────┼─────────┼──────────┼────────╢
║ Favicons 20160223          │ 1058 │ 37.72s │       - │        - │ 38.67s ║
╟────────────────────────────┼──────┼────────┼─────────┼──────────┼────────╢
║ Perspective 20150310       │ 1058 │ 41.57s │       - │        - │ 42.33s ║
╟────────────────────────────┼──────┼────────┼─────────┼──────────┼────────╢
║ Categories 20150331        │ 1058 │ 41.57s │       - │        - │ 42.59s ║
╟────────────────────────────┼──────┼────────┼─────────┼──────────┼────────╢
║ Language 20160105          │ 1058 │ 41.57s │       - │    2.62s │ 44.31s ║
╟────────────────────────────┼──────┼────────┼─────────┼──────────┼────────╢
║ Summariser 20160218        │ 1058 │ 41.57s │       - │    1.27s │ 43.04s ║
╟────────────────────────────┼──────┼────────┼─────────┼──────────┼────────╢
║ RenderHtml 20150917        │ 1058 │  2.85s │  16.48s │   14.73s │ 34.06s ║
╟────────────────────────────┼──────┼────────┼─────────┼──────────┼────────╢
║ Mentions 20150109          │ 1054 │ 44.31s │   6.01s │    1.65s │ 51.97s ║
╚════════════════════════════╧══════╧════════╧═════════╧══════════╧════════╝
```

## Pending workflows

```bash
$ swf-metrics pending --domain <swf-domain>

╔════════════════════════════╤══════════════╤══════════════╤══════════╤════════╤═════════╗
║ Activity                   │ # Processing │ # Completion │ # Failed │  Start │ Respond ║
╟────────────────────────────┼──────────────┼──────────────┼──────────┼────────┼─────────╢
║ RenderHtml 20150917        │           25 │        15/75 │        0 │  2.41s │  12.98s ║
╟────────────────────────────┼──────────────┼──────────────┼──────────┼────────┼─────────╢
║ ReadingTime 20150108       │            0 │         0/14 │        0 │  0.00s │   0.00s ║
╟────────────────────────────┼──────────────┼──────────────┼──────────┼────────┼─────────╢
║ Language 20160105          │            2 │        12/14 │        0 │ 32.16s │       - ║
╟────────────────────────────┼──────────────┼──────────────┼──────────┼────────┼─────────╢
║ MainProtagonist 20160420   │            2 │        11/13 │        0 │ 35.98s │       - ║
╟────────────────────────────┼──────────────┼──────────────┼──────────┼────────┼─────────╢
║ Perspective 20150310       │            1 │        13/14 │        0 │ 32.73s │       - ║
╟────────────────────────────┼──────────────┼──────────────┼──────────┼────────┼─────────╢
║ Mentions 20150109          │            1 │        13/14 │        0 │ 32.74s │   2.77s ║
╟────────────────────────────┼──────────────┼──────────────┼──────────┼────────┼─────────╢
║ Summariser 20160218        │            0 │        13/14 │        1 │ 29.98s │       - ║
╟────────────────────────────┼──────────────┼──────────────┼──────────┼────────┼─────────╢
║ Favicons 20160223          │            0 │        15/15 │        0 │ 29.50s │       - ║
╟────────────────────────────┼──────────────┼──────────────┼──────────┼────────┼─────────╢
║ BasicMetadata 20151130     │            0 │        15/15 │        0 │ 29.50s │       - ║
╟────────────────────────────┼──────────────┼──────────────┼──────────┼────────┼─────────╢
║ ReadingEase 20150310       │            0 │        14/14 │        0 │ 30.91s │       - ║
╟────────────────────────────┼──────────────┼──────────────┼──────────┼────────┼─────────╢
║ Seriousness 20150106       │            0 │        14/14 │        0 │ 30.91s │       - ║
╟────────────────────────────┼──────────────┼──────────────┼──────────┼────────┼─────────╢
║ Categories 20150331        │            0 │        14/14 │        0 │ 30.91s │       - ║
╟────────────────────────────┼──────────────┼──────────────┼──────────┼────────┼─────────╢
║ ExtractBody 20141218       │            0 │        15/15 │        0 │ 29.50s │       - ║
╟────────────────────────────┼──────────────┼──────────────┼──────────┼────────┼─────────╢
║ MobileFriendly 20150708    │            0 │        15/15 │        0 │ 29.50s │       - ║
╟────────────────────────────┼──────────────┼──────────────┼──────────┼────────┼─────────╢
║ MediaCount 20150108        │            0 │        14/14 │        0 │ 31.01s │       - ║
╟────────────────────────────┼──────────────┼──────────────┼──────────┼────────┼─────────╢
║ SerializeMetadata 20150107 │            0 │          1/1 │        0 │ 24.69s │       - ║
╟────────────────────────────┼──────────────┼──────────────┼──────────┼────────┼─────────╢
║ PronounCount 20150113      │            0 │        14/14 │        0 │ 30.91s │       - ║
╚════════════════════════════╧══════════════╧══════════════╧══════════╧════════╧═════════╝
```


# License

> Copyright 2016 British Broadcasting Corporation
>
> Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
>
> http://www.apache.org/licenses/LICENSE-2.0
>
> Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
