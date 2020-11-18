import { WaterfallBarChartData } from 'src/app/components/icons/waterfall-bar-chart/waterfall-bar-chart.component';
import { PcModificationStatusLegend } from 'src/app/components/pc-modification-status/pc-modification-status.component';

export const mockWaterfallBarChartData: WaterfallBarChartData = {
  label: 'Total',
  values: [100],
  colors: ['#000'],
  children: [
    {
      label: 'Confirmed',
      values: [25],
      colors: ['#0DA687'],
    },
    {
      label: 'Unconfirmed',
      values: [75],
      colors: ['#1170D1'],
      children: [
        {
          label: 'Modified',
          values: [20, 40],
          colors: ['rgba(17, 112, 209, .53)', 'rgba(17, 112, 209, .69)'],
        },
        {
          label: 'Unmodified',
          values: [40],
          colors: ['rgba(120, 179, 231, .4)'],
        },
      ],
    },
    {
      label: 'Non-PC Trades',
      values: [25],
      colors: ['#3BCEB0'],
      isolated: true,
    },
  ],
};
// chart legends
export const mockPcModificationStatusLegend: PcModificationStatusLegend[] = [
  { label: 'Confirmed', color: '#0DA687' },
  { label: 'Unconfirmed', color: '#1170D1' },
  { label: 'Non-PC Trades', color: '#3BCEB0' },
  { label: 'Modified', color: 'rgba(17, 112, 209, .53)' },
  { label: 'Manually Modified', color: 'rgba(17, 112, 209, .69)' },
  { label: 'Unmodified', color: 'rgba(120, 179, 231, .4)' },
];
