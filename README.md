# swf-metrics

> Introspective metrics and breakdowns of pending and finished AWS Simple Workflow executions.

# Use

```bash
$ swf-metrics <command> --domain <domain> [options]

Commands:
  failed [--no-breakdown]  Display metrics about failed workflows.
  pending                  Display metrics about pending workflows.

Options:
  --domain          SWF domain to get metrics from           [string] [required]
  --for             Duration of time of data to retrieve since the value of
                    --since. Eg: 6hours, 1day, etc.
                                                  [string] [default: [1,"hour"]]
  --workflow-id     Retrieve the metrics only for a given workflow.     [string]
  --time-threshold  Minimum time in seconds to consider a value significative
                    enough to be displayed.                [number] [default: 1]
  --since           Position in time from which we start retrieving the history
                    of data.      [string] [default: "2016-10-11T17:44:02.848Z"]
  --help            Show help                                          [boolean]
  --version         Show version number                                [boolean]
```

## Failed workflows

```
$ swf-metrics failed

╔════════════════════════════╤══════╤══════╤════════╤════╗
║ RenderHtml 20150917        │ 1668 │ 1593 │ 90.67% │ 73 ║
╟────────────────────────────┼──────┼──────┼────────┼────╢
║ SerializeMetadata 20150107 │ 1741 │ 54   │ 3.07%  │ 3  ║
╟────────────────────────────┼──────┼──────┼────────┼────╢
║ Seriousness 20150106       │ 75   │ 24   │ 1.37%  │ 1  ║
╟────────────────────────────┼──────┼──────┼────────┼────╢
║ ReadingEase 20150310       │ 75   │ 24   │ 1.37%  │ 1  ║
╟────────────────────────────┼──────┼──────┼────────┼────╢
║ Perspective 20150310       │ 75   │ 24   │ 1.37%  │ 1  ║
╟────────────────────────────┼──────┼──────┼────────┼────╢
║ Categories 20150331        │ 75   │ 24   │ 1.37%  │ 1  ║
╟────────────────────────────┼──────┼──────┼────────┼────╢
║ Summariser 20160218        │ 75   │ 11   │ 0.63%  │ 11 ║
╟────────────────────────────┼──────┼──────┼────────┼────╢
║ Mentions 20150109          │ 66   │ 3    │ 0.17%  │ 1  ║
╚════════════════════════════╧══════╧══════╧════════╧════╝

╔══════════════════════════════════════════════════════════════╤══════╤══════════════════════════════════════╗
║ RenderHtml 20150917 Received error code 1\u000A              │ 1149 │ 8c73e273-24e7-4a1c-ba94-22e7acf373ce ║
║                                                              │      │ 22312f04-ec3a-429b-8df4-793515f2f8be ║
║                                                              │      │ 3979f531-7050-4698-9d00-ddac61b2fe4e ║
║                                                              │      │ 1c21b959-cfbb-49fe-90f9-f24ddec7f108 ║
║                                                              │      │ d8f07247-5886-44f4-991d-744a5d2c205d ║
║                                                              │      │ 60d93bd8-dcc7-47e4-8fef-4120b5e4a5b4 ║
║                                                              │      │ dd14b1ee-bc6b-405c-93dd-ffc4e695010d ║
║                                                              │      │ 7fe5ce24-cdf8-4402-87f0-14f956ddc871 ║
║                                                              │      │ a34aad7f-576b-4130-976e-f6a8cc2d2bd6 ║
║                                                              │      │ 2f841f46-46ce-4704-a381-ae73d...     ║
╟──────────────────────────────────────────────────────────────┼──────┼──────────────────────────────────────╢
║ RenderHtml 20150917 Expected worker output to be a well-form │ 163  │ 81867cfc-7172-467a-bdc8-414b47e1676a ║
║ ed JSON Hash\u000A757: unexpected token at 'ALSA lib pulse.c │      │ 14306d77-779d-49ff-8183-df28c3fbc2b0 ║
║ :243:(pulse_connect) PulseAudio: Unable to connect: Connecti │      │ 6dfc00c4-eee1-4ce3-840f-3c1ac823a516 ║
║ on refused\u000A\u000A\u000A'                                │      │ c2af27ca-7c54-4a49-8bdb-a61d9d2e5798 ║
║                                                              │      │ a703e7c8-bad8-4638-af9d-a4d5c35f0d59 ║
║                                                              │      │ 8f5b96f8-90d5-4e26-a32c-e0fbd312b55a ║
║                                                              │      │ a2cd66a0-3f2b-4ff2-a1b6-e065f13e1d04 ║
║                                                              │      │ b2b9021f-50fc-44ea-b989-6f9151e70e56 ║
║                                                              │      │ c942a5d0-78fe-4de8-9e09-89e0c86125fa ║
║                                                              │      │ 3a817869-b6f7-4ee9-b84a-4f2eb...     ║
```

## Pending workflows

```bash
$ swf-metrics --domain ExampleFreebird pending

╔════════════════════════════╤═════════════╤═══╤═════════╤════════╤════════╗
║ RenderHtml 20150917        │ 1/710/711   │ 0 │ 4.51s.  │ -      │ 7.10s. ║
╟────────────────────────────┼─────────────┼───┼─────────┼────────┼────────╢
║ BasicMetadata 20151130     │ 0/710/710   │ 0 │ 15.92s. │ 1.10s. │ -      ║
╟────────────────────────────┼─────────────┼───┼─────────┼────────┼────────╢
║ ExtractBody 20141218       │ 0/710/710   │ 0 │ 15.92s. │ -      │ -      ║
╟────────────────────────────┼─────────────┼───┼─────────┼────────┼────────╢
║ MobileFriendly 20150708    │ 2/707/710   │ 0 │ 15.96s. │ 2.87s. │ -      ║
╟────────────────────────────┼─────────────┼───┼─────────┼────────┼────────╢
║ Favicons 20160223          │ 0/710/710   │ 0 │ 15.92s. │ -      │ -      ║
╟────────────────────────────┼─────────────┼───┼─────────┼────────┼────────╢
║ MediaCount 20150108        │ 1/709/710   │ 0 │ 22.08s. │ -      │ -      ║
╟────────────────────────────┼─────────────┼───┼─────────┼────────┼────────╢
║ Seriousness 20150106       │ 1/706/710   │ 3 │ 21.94s. │ -      │ -      ║
╟────────────────────────────┼─────────────┼───┼─────────┼────────┼────────╢
║ ReadingTime 20150108       │ 1/709/710   │ 0 │ 21.99s. │ 8.86s. │ -      ║
╟────────────────────────────┼─────────────┼───┼─────────┼────────┼────────╢
║ Mentions 20150109          │ 1/709/710   │ 0 │ 23.29s. │ 9.37s. │ 1.73s. ║
╟────────────────────────────┼─────────────┼───┼─────────┼────────┼────────╢
║ PronounCount 20150113      │ 1/709/710   │ 0 │ 21.99s. │ -      │ -      ║
╟────────────────────────────┼─────────────┼───┼─────────┼────────┼────────╢
║ ReadingEase 20150310       │ 1/706/710   │ 3 │ 21.94s. │ -      │ -      ║
╟────────────────────────────┼─────────────┼───┼─────────┼────────┼────────╢
║ Perspective 20150310       │ 1/706/710   │ 3 │ 21.94s. │ -      │ -      ║
╟────────────────────────────┼─────────────┼───┼─────────┼────────┼────────╢
║ Categories 20150331        │ 1/706/710   │ 3 │ 21.94s. │ 3.32s. │ -      ║
╟────────────────────────────┼─────────────┼───┼─────────┼────────┼────────╢
║ Language 20160105          │ 1/709/710   │ 0 │ 21.99s. │ 1.60s. │ 2.32s. ║
╟────────────────────────────┼─────────────┼───┼─────────┼────────┼────────╢
║ Summariser 20160218        │ 0/0/710     │ 0 │ -       │ -      │ -      ║
╟────────────────────────────┼─────────────┼───┼─────────┼────────┼────────╢
║ MainProtagonist 20160420   │ 0/705/706   │ 0 │ 39.92s. │ -      │ -      ║
╟────────────────────────────┼─────────────┼───┼─────────┼────────┼────────╢
║ SerializeMetadata 20150107 │ 4/1247/1277 │ 0 │ 66.65s. │ -      │ -      ║
╚════════════════════════════╧═════════════╧═══╧═════════╧════════╧════════╝
```

## For a given workflow

```bash
$ swf-metrics --domain ExampleFreebird pending --workflow-id e1adf3c6-9169-468b-b57c-685419ebbb02
╔════════════════════════════╤═══════╤═══╤═════════╤════════╤═════════╗
║ RenderHtml 20150917        │ 0/1/1 │ 0 │ 19.38s. │ -      │ 12.67s. ║
╟────────────────────────────┼───────┼───┼─────────┼────────┼─────────╢
║ BasicMetadata 20151130     │ 0/1/1 │ 0 │ 40.60s. │ -      │ -       ║
╟────────────────────────────┼───────┼───┼─────────┼────────┼─────────╢
║ ExtractBody 20141218       │ 0/1/1 │ 0 │ 40.60s. │ -      │ -       ║
╟────────────────────────────┼───────┼───┼─────────┼────────┼─────────╢
║ MobileFriendly 20150708    │ 0/1/1 │ 0 │ 40.60s. │ -      │ -       ║
╟────────────────────────────┼───────┼───┼─────────┼────────┼─────────╢
║ Favicons 20160223          │ 0/1/1 │ 0 │ 40.60s. │ -      │ -       ║
╟────────────────────────────┼───────┼───┼─────────┼────────┼─────────╢
║ MediaCount 20150108        │ 0/1/1 │ 0 │ 52.35s. │ -      │ -       ║
╟────────────────────────────┼───────┼───┼─────────┼────────┼─────────╢
║ Seriousness 20150106       │ 0/1/1 │ 0 │ 52.35s. │ -      │ -       ║
╟────────────────────────────┼───────┼───┼─────────┼────────┼─────────╢
║ ReadingTime 20150108       │ 0/1/1 │ 0 │ 52.35s. │ 8.31s. │ -       ║
╟────────────────────────────┼───────┼───┼─────────┼────────┼─────────╢
║ Mentions 20150109          │ 0/1/1 │ 0 │ 52.35s. │ 3.64s. │ 1.39s.  ║
╟────────────────────────────┼───────┼───┼─────────┼────────┼─────────╢
║ PronounCount 20150113      │ 0/1/1 │ 0 │ 52.35s. │ -      │ -       ║
╟────────────────────────────┼───────┼───┼─────────┼────────┼─────────╢
║ ReadingEase 20150310       │ 0/1/1 │ 0 │ 52.35s. │ -      │ -       ║
╟────────────────────────────┼───────┼───┼─────────┼────────┼─────────╢
║ Perspective 20150310       │ 0/1/1 │ 0 │ 52.35s. │ -      │ -       ║
╟────────────────────────────┼───────┼───┼─────────┼────────┼─────────╢
║ Categories 20150331        │ 0/1/1 │ 0 │ 52.35s. │ -      │ -       ║
╟────────────────────────────┼───────┼───┼─────────┼────────┼─────────╢
║ Language 20160105          │ 0/1/1 │ 0 │ 52.35s. │ -      │ 4.40s.  ║
╟────────────────────────────┼───────┼───┼─────────┼────────┼─────────╢
║ Summariser 20160218        │ 0/0/1 │ 0 │ -       │ -      │ -       ║
╟────────────────────────────┼───────┼───┼─────────┼────────┼─────────╢
║ SerializeMetadata 20150107 │ 0/2/2 │ 0 │ 71.71s. │ -      │ -       ║
╟────────────────────────────┼───────┼───┼─────────┼────────┼─────────╢
║ MainProtagonist 20160420   │ 0/1/1 │ 0 │ 61.66s. │ -      │ -       ║
╚════════════════════════════╧═══════╧═══╧═════════╧════════╧═════════╝
```
