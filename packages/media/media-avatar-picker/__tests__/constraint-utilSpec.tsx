import {
  constrainPos,
  constrainScale,
  constrainEdges,
} from '../src/constraint-util';
import {
  CONTAINER_SIZE,
  CONTAINER_INNER_SIZE,
  CONTAINER_PADDING,
} from '../src/image-navigator';

const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = 400;
const SCALE = 1;

describe('Constraint Spec', () => {
  describe('Position Constraint', () => {
    describe('Unconstrained', () => {
      it('should return same coords when at origin position', () => {
        const constrainedPos = constrainPos(
          0,
          0,
          IMAGE_WIDTH,
          IMAGE_HEIGHT,
          SCALE,
        );
        expect(constrainedPos.x).toBe(0);
        expect(constrainedPos.y).toBe(0);
      });

      it('should return same coords when at middle position', () => {
        const constrainedPos = constrainPos(
          -75,
          -75,
          IMAGE_WIDTH,
          IMAGE_HEIGHT,
          SCALE,
        );
        expect(constrainedPos.x).toBe(-75);
        expect(constrainedPos.y).toBe(-75);
      });

      it('should return same coords when at corner position', () => {
        const constrainedPos = constrainPos(
          -100,
          -100,
          IMAGE_WIDTH,
          IMAGE_HEIGHT,
          SCALE,
        );
        expect(constrainedPos.x).toBe(-100);
        expect(constrainedPos.y).toBe(-100);
      });
    });

    describe('Constrained', () => {
      it('should return constrained coords when greater than origin position', () => {
        const constrainedPos = constrainPos(
          10,
          10,
          IMAGE_WIDTH,
          IMAGE_HEIGHT,
          SCALE,
        );
        expect(constrainedPos.x).toBe(10);
        expect(constrainedPos.y).toBe(10);
      });

      it('should return constrained coords when greater than corner position', () => {
        const constrainedPos = constrainPos(
          -105,
          -105,
          IMAGE_WIDTH,
          IMAGE_HEIGHT,
          SCALE,
        );
        expect(constrainedPos.x).toBe(-105);
        expect(constrainedPos.y).toBe(-105);
      });

      it('should constrain inner edges to inner crop area at full scale', () => {
        const constrainedPos = constrainEdges(
          CONTAINER_SIZE,
          CONTAINER_SIZE,
          IMAGE_WIDTH,
          IMAGE_HEIGHT,
          SCALE,
        );
        expect(constrainedPos.x).toBe(CONTAINER_PADDING);
        expect(constrainedPos.y).toBe(CONTAINER_PADDING);
      });

      it('should constrain inner edges to inner crop area at half scale', () => {
        const constrainedPos = constrainEdges(
          CONTAINER_SIZE,
          CONTAINER_SIZE,
          IMAGE_WIDTH,
          IMAGE_HEIGHT,
          SCALE * 0.5,
        );
        expect(constrainedPos.x).toBe(CONTAINER_PADDING);
        expect(constrainedPos.y).toBe(CONTAINER_PADDING);
      });

      it('should constrain outer edges to inner crop area at full scale', () => {
        const constrainedPos = constrainEdges(
          IMAGE_WIDTH * -0.5,
          IMAGE_WIDTH * -0.5,
          IMAGE_WIDTH,
          IMAGE_HEIGHT,
          SCALE,
        );
        expect(constrainedPos.x).toBe(
          (CONTAINER_INNER_SIZE - CONTAINER_PADDING) * -1,
        );
        expect(constrainedPos.y).toBe(
          (CONTAINER_INNER_SIZE - CONTAINER_PADDING) * -1,
        );
      });

      it('should constrain outer edges to inner crop area at half scale', () => {
        const constrainedPos = constrainEdges(
          IMAGE_WIDTH * -0.5,
          IMAGE_WIDTH * -0.5,
          IMAGE_WIDTH,
          IMAGE_HEIGHT,
          SCALE * 0.5,
        );
        expect(constrainedPos.x).toBe(CONTAINER_PADDING);
        expect(constrainedPos.y).toBe(CONTAINER_PADDING);
      });
    });
  });
});

describe('Scale Constraint', () => {
  describe('Unconstrained', () => {
    it('should return same scale when fully zoomed out', () => {
      const constrainedScale = constrainScale(
        1,
        SCALE,
        IMAGE_WIDTH,
        IMAGE_HEIGHT,
      );
      expect(constrainedScale).toBe(1);
    });

    it('should return same scale when at min scale', () => {
      const constrainedScale = constrainScale(
        0.5,
        SCALE,
        IMAGE_WIDTH,
        IMAGE_HEIGHT,
      );
      expect(constrainedScale).toBe(0.5);
    });
  });

  describe('Constrained', () => {
    it('should return constrained scale when zoomed lower than min scale', () => {
      const constrainedScale = constrainScale(
        0.4,
        0.5,
        IMAGE_WIDTH,
        IMAGE_HEIGHT,
      );
      expect(constrainedScale).toBe(0.5);
    });
  });
});
