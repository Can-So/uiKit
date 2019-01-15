// this isn't implemented by JSDOM so we've implemented it to make Typescript happy
// see https://github.com/tmpvar/jsdom/issues/1568
export class MockFile implements File {
  readonly size: number;
  readonly type: string;
  readonly lastModified: number = 1234;
  readonly lastModifiedDate: any;
  readonly name: string;
  readonly webkitRelativePath: string;
  msClose(): void {}
  msDetachStream(): any {}
  slice(): Blob {
    throw new Error('not implemented');
  }
  constructor(
    options: { type: string; name: string } = {
      type: '',
      name: 'some-file.png',
    },
  ) {
    this.type = options.type;
    this.name = options.name;
    this.size = 0;
    this.webkitRelativePath = '';
  }
}

// this isn't implemented by JSDOM so we've implemented it to make Typescript happy
// see https://github.com/tmpvar/jsdom/issues/1568
export class MockFileList extends Array<File> {
  item(index: number): File {
    return this[index];
  }

  static fromArray(files: File[]) {
    const list = new MockFileList();
    files.forEach(file => list.push(file));
    return list;
  }
}

// this isn't implemented by JSDOM so we've implemented it to make Typescript happy
// see https://github.com/tmpvar/jsdom/issues/1568
export class MockDataTransfer implements DataTransfer {
  constructor(
    readonly files: FileList,
    readonly types: string[] = [],
    readonly items: DataTransferItemList = [] as any,
    readonly dropEffect: string = '',
    readonly effectAllowed: string = '',
  ) {}

  clearData(): boolean {
    return false;
  }
  getData(): string {
    return '';
  }
  setData(): boolean {
    return false;
  }
  setDragImage(): void {}
}

// this isn't implemented by JSDOM, and JSDOM .dispatchEvent() requires that event is an instanceof event,
// so we've implemented it to make Typescript happy
// see https://github.com/tmpvar/jsdom/issues/1568
export class MockClipboardEvent extends Event implements ClipboardEvent {
  clipboardData: DataTransfer;
  constructor(event: string, files: File[] = [], types: string[] = []) {
    super(event);
    this.clipboardData = new MockDataTransfer(
      MockFileList.fromArray(files),
      types,
    );
  }
}

export class MockDragEvent extends MouseEvent implements DragEvent {
  dataTransfer: DataTransfer;
  constructor(event: string, files: File[] = []) {
    super(event);
    this.dataTransfer = new MockDataTransfer(MockFileList.fromArray(files));
  }
  initDragEvent(): void {
    // noop
  }
  msConvertURL(): void {
    // noop
  }
}
