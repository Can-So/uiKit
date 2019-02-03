import * as React from 'react';
import styled from 'styled-components';
import WidthDetector from '../src';
// console.log('WD:', WidthDetector)
const Div = styled.div`
  max-width: 500px;
`;

const containerDivStyle = {
  position: 'relative',
  width: '100%',
};

const ResultBox = styled.div`
  align-items: center;
  background-color: rebeccapurple;
  color: white;
  display: flex;
  height: 100%;
  justify-content: center;
  white-space: nowrap;
`;

type Props = {
  children: (Number) => Node;
};

type State = {
  width?: Number;
};

// export class WidthDetector extends React.Component<Props, State> {
//   containerRef: HTMLElement;
//   innerRef: HTMLElement;

//   state = {
//     width: null,
//   };

//   handleContainerRef = (ref) => {
//     this.containerRef = ref;
//   };
//   handleInnerRef = (ref) => {
//     this.innerRef = ref;
//   };
//   updateWidth(width) {

//   console.log('width', width);
//   this.setState({ width });

//       // Each entry describes an intersection change for one observed
//       // target element:
//       //   entry.boundingClientRect
//       //   entry.intersectionRatio
//       //   entry.intersectionRect
//       //   entry.isIntersecting
//       //   entry.rootBounds
//       //   entry.target
//       //   entry.time

//   };

//   componentDidMount() {
//     var options = {
//       root: this.containerRef,
//       rootMargin: '0px',
//       threshold: 1
//     }

//     var intersectionObserver = new IntersectionObserver(entries => {
//       console.log('Intersection', entries);
//     }, options);
//     intersectionObserver.observe(this.innerRef);

//     var resizeObserver = new ResizeObserver(entries => {
//       console.log('entries', entries);
//       for (let entry of entries) {
//         console.log('resize entry', entry)
//         this.updateWidth(entry.contentRect.width);
//         entry.target.style.borderRadius = Math.max(0, 250 - entry.contentRect.width) + 'px';
//       }
//     });
//     console.log(this.innerRef);
//     resizeObserver.observe(this.innerRef);
//   }

//   render() {
//     return <React.Fragment>
//     {this.props.children(this.state.width)}
//     <div
//       className="ak-width-detector-container"
//       style={{ ...containerDivStyle }}
//       ref={this.handleContainerRef}
//     >
//       <div
//         className="ak-wd-sizer"
//         ref={this.handleInnerRef}
//         style={{
//           height: 0,
//           left: 0,
//           pointerEvents: 'none',
//           position: 'absolute',
//           top: 0,
//           visibility: 'hidden',
//           zIndex: -1,
//           width: '100%',

//         }}
//       />
//     </div>
//     </React.Fragment>;
//   }
// }

export default class extends React.Component {
  render() {
    return (
      <div
        id="bar"
        style={{ width: '100%', position: 'relative', backgroundColor: 'red' }}
      >
        <p>Inside a parent with set height1</p>
        <p>Inside a parent with set height2</p>
        <div style={{ height: 100, maxWidth: 400, border: '1px solid blue' }}>
          <WidthDetector>
            {(width: Number) => <p className="my-component-child">{width}</p>}
          </WidthDetector>
        </div>
      </div>
    );
  }
}
