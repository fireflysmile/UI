import { fakeAsync, tick } from '@angular/core/testing';
import {
  checkFileAcceptable,
  checkFileTotalSize,
  toDataUrl,
} from './file.util';

describe('File Util', () => {
  it('should convert file to url', async () => {
    let isSuccess = false;
    try {
      const data = await toDataUrl(
        new File([new Blob()], 'dummy.pdf', { type: 'pdf' })
      ).then(() => {
        isSuccess = true;
      });
      isSuccess = true;
    } catch (e) {
      isSuccess = false;
    }
    expect(isSuccess).toEqual(true);
    try {
      const data = await toDataUrl(
        new File([new Blob()], 'dummy.pdf', { type: 'pdf' }),
        (reader) => {
          reader.onload(null);
        }
      ).then(() => {
        isSuccess = true;
      });
      isSuccess = true;
    } catch (e) {
      isSuccess = false;
    }

    expect(isSuccess).toEqual(true);
    try {
      const data = await toDataUrl(
        new File([new Blob()], 'dummy.pdf', { type: 'pdf' }),
        (reader) => {
          reader.onerror(null);
        }
      ).then(() => {
        isSuccess = true;
      });
      isSuccess = true;
    } catch (e) {
      isSuccess = false;
    }
    expect(isSuccess).toEqual(false);
  });

  it('should check file total size', async () => {
    expect(
      checkFileTotalSize(
        [new File([new Blob()], 'dummy.pdf', { type: 'pdf' })],
        0
      )
    ).toEqual(true);
    expect(
      checkFileTotalSize(
        [new File([new Blob()], 'dummy.pdf', { type: 'pdf' })],
        10
      )
    ).toEqual(true);
  });

  it('should check file accept', async () => {
    expect(
      checkFileAcceptable(
        [new File([new Blob()], 'dummy.pdf', { type: 'pdf' })],
        ['pdf']
      )
    ).toEqual(true);
    expect(
      checkFileAcceptable(
        [new File([new Blob()], 'dummy.pdf', { type: 'pdf' })],
        []
      )
    ).toEqual(true);
  });
});
