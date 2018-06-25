import * as React from 'react';
import * as PDFJSViewer from 'pdfjs-dist/web/pdf_viewer';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import { injectGlobal } from 'styled-components';
import { ZoomControls } from '../../zoomControls';
import { ErrorMessage, PDFWrapper } from '../../styled';
import { closeOnDirectClick } from '../../utils/closeOnDirectClick';
import { Outcome, ZoomLevel } from '../../domain';
import { Spinner } from '../../loading';

export const pdfViewerClassName = 'pdfViewer';

/* tslint:disable:no-unused-expression */
injectGlobal`
  .${pdfViewerClassName} {
    margin-top: 64px;
    margin-bottom: 64px;
    .page {
      margin: 1px auto -8px auto;
      border: 9px solid transparent;
      position: relative;

      .canvasWrapper {
        overflow: hidden;
      }

      .textLayer {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        line-height: 1;
        font-family: sans-serif;
        opacity: 0.8;
        
        ::selection {
          background: rgb(0,0,255);
        }
      }
      
      .annotationLayer {
        position: absolute;
        top: 0;
        bottom: 0;
      }
      
      .textLayer > div, .annotationLayer > section {
        color: transparent;
        position: absolute;
        white-space: pre;
        cursor: text;
        transform-origin: 0% 0%;
      }
      .linkAnnotation > a {
        position: absolute;
        font-size: 1em;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .linkAnnotation > a {
        background: url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7") 0 0 repeat;
      }

      .linkAnnotation > a:hover {
        opacity: 0.2;
        background: #ff0;
        box-shadow: 0 2px 10px #ff0;
      }
    }
  }
`;
/* tslint:enable:no-unused-expression */

pdfjsLib.GlobalWorkerOptions.workerSrc = '/'; // TODO: use web workers instead of fake worker.

const fetch = (url: string): Promise<Blob> => {
  return pdfjsLib.getDocument(url).promise;
};

export type Props = {
  src: string;
  onClose?: () => void;
};

export type State = {
  doc: Outcome<any, Error>;
  zoomLevel: ZoomLevel;
};

const initialState: State = {
  zoomLevel: new ZoomLevel(),
  doc: { status: 'PENDING' },
};

export class PDFRenderer extends React.Component<Props, State> {
  private el: HTMLDivElement;
  private pdfViewer: any;

  state: State = initialState;

  componentDidMount() {
    this.init();
  }

  private async init() {
    try {
      const doc = await fetch(this.props.src);
      this.setState({ doc: { status: 'SUCCESSFUL', data: doc } }, () => {
        this.pdfViewer = new PDFJSViewer.PDFViewer({ container: this.el });
        this.pdfViewer.setDocument(doc);
      });
    } catch (err) {
      this.setState({ doc: { status: 'FAILED', err } });
    }
  }

  private savePdfElement = el => {
    this.el = el;
  };

  private handleZoom = zoomLevel => {
    this.pdfViewer.currentScale = zoomLevel.value;
    this.setState({ zoomLevel });
  };

  render() {
    const { doc } = this.state;
    switch (doc.status) {
      case 'PENDING':
        return <Spinner />;
      case 'SUCCESSFUL':
        return (
          <PDFWrapper innerRef={this.savePdfElement}>
            <div
              className={pdfViewerClassName}
              onClick={closeOnDirectClick(this.props.onClose)}
            />
            <ZoomControls
              zoomLevel={this.state.zoomLevel}
              onChange={this.handleZoom}
            />
          </PDFWrapper>
        );
      case 'FAILED':
        return <ErrorMessage>{doc.err.message}</ErrorMessage>;
    }
  }
}
