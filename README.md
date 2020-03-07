# OpenDaylight Maven Action
Github Action for develop OpenDaylight App. This action set up the required OpenDaylight maven settings needed for development of OpenDaylight Apps.

Optional input arguments
```
skipTests:
  description: "Skip tests (Default: false)"
  default: false
verbose:
  description: "Set verbosity (Default: true)"
  default: true
```

Basic Usage:
```
steps:
  - name: OpenDaylight Maven Action
    uses: zenious/opendaylight-maven-action@master
```

Extended Usage with optionals:
```
steps:
  - name: OpenDaylight Maven Action
    uses: zenious/opendaylight-maven-action@master
    with: 
      skipTests: true
      verbose: true
```