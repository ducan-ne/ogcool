import { expect, test } from 'bun:test'
import ogcool from '@/app/sdk'

test('sdk', () => {
  expect(
    ogcool('UnJS', {
      modifications: [
        {
          name: 'Description',
          text: 'Hello world',
        },
      ],
    }),
  ).toMatchSnapshot()
})

test('sdk:telemetry-disabled', () => {
  expect(
    ogcool('UnJS', {
      modifications: [
        {
          name: 'Description',
          text: 'Hello world',
        },
      ],
      disableTelemetry: true,
    }),
  ).toMatchSnapshot()
})

test('sdk:empty', () => {
  expect(ogcool('UnJS')).toMatchSnapshot()
})
