# CollateralManagement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.29.

## Install dependencies

```bash
npm i
```

## Start local dev server

```bash
# open `http://localhost:4200`
npm run start:open
```

## Other commands

```bash
# start local dev server without opening browser
npm start

# build in development mode
npm run build

# build in production mode
npm run build:prod

# lint without fix
npm run lint

# lint with fix
npm run lint:fix
```

## Running unit tests

- Run `npm run test` to execute the unit tests.
- Run `npm run test:cov` to execute the unit tests with code coverage;
- Run `npm run test:chrome` to execute the unit tests in chrome browser;

## Mock data

The mock data are in `assets/data` directory.

## Environments

All environments files are in `src/environments` directory.\
The `environment.common.ts` file has common environment values for both production and development.

- `production`: Define production mode.
- `apiHost`: The api host url.
- `requestStatusConfig`: The label/value sets for request status.
- `collateralConfig`: The label/value sets for collateral type.
- `segmentConfig`: The label/value sets for segment.
- `instrumentTypeConfig`: The label/value sets for instrument type.
- `timeOptions`: The available options for time selector.
- `watchingInterval`: The interval milliseconds to refresh data in real-time.
- `collateralWatchingInterval`: The collateral interval milliseconds to refresh data in real-time.
- `requestExtensionUploaderConfig`: The file upload configuration for request extension uploader.
- `dir12UploaderConfig`: The file upload configuration for dir 12 uploader.

## TableColumn

There is only one table component in this application and it will render the content dynamically according to `TableColumn<T>`.\
The `src/app/models/table-column.ts` includes interfaces and types which are associated with `TableColumn<T>` class.

The generic option `<T>` is data type of the table.

The `TableColumn<T>` accepts 2 parameters:

- `label`: **Required**. The label for column header.
- `property`: **Required**. The property name of data for column.
- `options`: **Optional**. The additional options for column.
- `options.filterType`: **Optional**. The filter type for column. Default is `'default'`.
- `options.displayType`: **Optional**. The display type for column. Default is `'default'`.
- `options.dateFormat`: **Optional**. The date format for column that has `options.displayType: 'date'`. It uses Angular built-in date pipe to format. Default is `dd MMM yyyy`.
- `options.routerLink`: **Optional**. The method to create router link. A row data will be passed as first parameter. You can use this method for `'link'` type display.

### TableColumnFilterType

This is available types for `options.filterType` for `TableColumn<T>`.

- `'default'`: Default value. Make column to use multi-select filter.
- `'date'`: Make column to use date range filter.
- `'time'`: Make column to use time range filter.
- `'quantity'`: Make column to use quantity filter.
- `'none'`: Hide filter for column.

### TableColumnDisplayType

This is available types for `options.displayType` for `TableColumn<T>`.

- `'default'`: Default value. Display data raw data in column.
- `'date'`: Display date formatted data in column. It needs `options.dateFormat`.
- `'titlecase'`: Display value as titlecase formatted.
- `'request-status'`: Display request status value with colored fonts.
- `'instrument-type'`: Display instrument type value with proper label. It uses `instrumentTypeConfig` in `environment.common.ts`.
- `'quantity'`: Display quantity value as comma separated. The quantity values will be aligned on right.
- `'destination-segment'`: Display destination segment selector.
- `'link`': Display link text using `routerLink`.
- `'numeric'`: Display numeric values. The numeric values will be aligned on right.
- `'allocation-status'`: Display allocation/modification status for orders.

## TablePageBase

There is `TablePageBaseModule` in this application.\
It contains `TablePageBaseComponent` which is base class of both `RequestPagesComponent` and `TransferPagesComponent`.\
See `RequestPagesComponent` and `TransferPagesComponent` to get how to extend this class.

## StackedBarChart

The `StackedBarChartModule` contains the components to create stacked bar chart which is used in main dashboard page of officials.

The chart is rendered without using any third-party library.

The main entry component of stacked bar chart is `StackedBarChartComponent`.

It accepts following attributes as inputs:

- `data: StackedBarData[]`: **Required**. This is the data list of stacked bar chart. See more details from the **StackedBarData** section.
- `colors: StackedBarColor[]`: **Required**. This is color set of stacked bar chart. See more details from the **StackedBarColor** section.
- `steps: number`: **Optional**. This is step count for the horizontal grids in chart. Default is `5`.

### StackedBarData

This is model for data of stacked bar chart.

- `label: string`: **Required**. The label of the data. It will be displayed in x axis label line.
- `values: StackedBarValue[]`: **Required**. The values of the data. The bar will be stacked according to this values. The values will be stacked in reversed.
- `selected: boolean`: **Optional**. The selected state of the bar. Set `true` to highlight the bar.
- `selectedLabel: string`: **Optional**. The selected label of the bar. This will be displayed when bar has `selected: true`.

### StackedBarColor

This is model for colors of stacked bar chart.

- `key: string`: The key for the data. This will be used for legend label of each data.
- `color: string`: The css color value to apply for data.

### StackedBarValue

This is model for values of stacked bar chart.

- `key: string`: The key for the data. This should be same with the `key` property of `StackedBarColor` to appropriate color for the data.
- `value: number`: The value for the data.


## Services
### collateral service
* develop
> 1. collateral service get data from assets/data/collateral/**
>  2. the data just a template, after get data, we apply Amplification, Random  
>> * Amplification: just times a number such as 20.
    (reference: getCollateralDetailsSecurity function in services/api/collateral.service.ts)
>>   * Random: For number: if there is number in data, random it in [0, 500), if the numbers in data are all percent, random them in [0, 100). For segment and instrumentType: there are segment and instrumentType constants, just select one from that.
     (reference: postProcess && generateTableData functions in services/api/collateral.service.ts)

## Verification

See `docs/verification.md`.

## Verification v2

See `docs/verification.v2.md`.

## Verification v3

See `docs/verification.v3.md`.

## Verification v4

See `docs/verification.v4.md`.

## Verification v5

See `docs/verification.v5.md`.

## Verification v6

See `docs/verification.v6.md`.

## Collateral Verification

See `docs/verification.collateral.md`.