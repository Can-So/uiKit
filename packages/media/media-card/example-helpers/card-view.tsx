import * as React from 'react';
import * as deepcopy from 'deepcopy';
import {
  ImageResizeMode,
  MediaItemDetails,
  MediaItemType,
  FileDetails,
  UrlPreview,
} from '@atlaskit/media-core';
import {
  wideTransparentImage,
  tallImage,
  smallImage,
  smallTransparentImage,
  videoFileDetails,
  audioFileDetails,
  docFileDetails,
  unknownFileDetails,
} from '@atlaskit/media-test-helpers';
import {
  StoryList,
  genericLinkDetails,
  genericFileDetails,
  imageFileDetails,
  gifDataUri,
  wideImage,
  genericUrlPreview,
} from '@atlaskit/media-test-helpers';
import { CardView, CardAppearance, CardDimensions } from '../src';
import {
  actions,
  annotateCardAction,
  deleteAction,
  clickHandler,
  mouseEnterHandler,
} from './index';

const images = [
  wideTransparentImage,
  tallImage,
  smallImage,
  smallTransparentImage,
];
const resizeModes: Array<ImageResizeMode> = ['crop', 'fit', 'full-fit'];

export const createCardsOfDifferentResizeModes = () => {
  return resizeModes.map(mode => {
    const content = images.map(img => (
      <CardView
        appearance="image"
        status="complete"
        resizeMode={mode}
        dataURI={img}
      />
    ));

    return {
      title: mode,
      content,
    };
  });
};

const dimensions: Array<CardDimensions> = [
  {
    width: '80px',
    height: '80px',
  },
  {
    width: '80px',
    height: '250px',
  },
  {
    width: '350px',
    height: '80px',
  },
];

export const createCardsOfDifferentSize = (
  appearance: CardAppearance,
  metadata: MediaItemDetails,
  dataURI?: string,
) => {
  const cards = dimensions.map(dim => {
    return {
      title: `${dim.width} x ${dim.height}`,
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={metadata}
          dataURI={dataURI}
          dimensions={dim}
          actions={actions}
        />
      ),
    };
  });

  return cards;
};

export const createFileCardsWithDifferentMediaTypes = (
  appearance: CardAppearance,
) => {
  const fileMediaTypeCards = [
    {
      title: 'Image',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={imageFileDetails}
        />
      ),
    },
    {
      title: 'Video',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={videoFileDetails}
        />
      ),
    },
    {
      title: 'Audio',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={audioFileDetails}
        />
      ),
    },
    {
      title: 'Doc',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={docFileDetails}
        />
      ),
    },
    {
      title: 'Unknown',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={unknownFileDetails}
        />
      ),
    },
  ];

  return fileMediaTypeCards;
};

export const createMenuActionCards = (
  appearance: CardAppearance,
  metadata: MediaItemDetails,
) => {
  return [
    {
      title: 'Single menu action',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={metadata}
          actions={actions.slice(0, 1)}
        />
      ),
    },
    {
      title: 'Multiple menu actions',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={metadata}
          actions={actions}
        />
      ),
    },
    {
      title: 'Delete action',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={metadata}
          actions={[deleteAction]}
        />
      ),
    },
    {
      title: '2 primary actions',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={metadata}
          actions={[annotateCardAction, deleteAction]}
        />
      ),
    },
  ];
};
export const createFileCardsWithDifferentDataURIs = (
  appearance: CardAppearance,
) => {
  const dataURIs = [
    { name: 'tall image', dataURI: tallImage },
    { name: 'wide image', dataURI: wideImage },
    { name: 'wide transparent image', dataURI: wideTransparentImage },
    { name: 'small image', dataURI: smallImage },
    { name: 'small transparent image', dataURI: smallTransparentImage },
  ];

  return Object.keys(dataURIs).map(key => {
    const { name, dataURI } = dataURIs[key];

    return {
      title: name,
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={genericFileDetails}
          dataURI={dataURI}
        />
      ),
    };
  });
};

export const createSelectableCards = (
  appearance: CardAppearance,
  metadata: MediaItemDetails,
  mediaItemType: MediaItemType,
) => {
  const dataURI = mediaItemType === 'file' ? gifDataUri : undefined;

  return [
    {
      title: 'Complete - Selectable',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={metadata}
          dataURI={dataURI}
          selectable={true}
        />
      ),
    },
    {
      title: 'Complete - Selected',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={metadata}
          dataURI={dataURI}
          selectable={true}
          selected={true}
        />
      ),
    },
    {
      title: 'Uploading - Selectable',
      content: (
        <CardView
          appearance={appearance}
          status="uploading"
          progress={0.3}
          metadata={metadata}
          dataURI={dataURI}
          selectable={true}
        />
      ),
    },
    {
      title: 'Uploading - Selected',
      content: (
        <CardView
          appearance={appearance}
          status="uploading"
          progress={0.7}
          metadata={metadata}
          dataURI={dataURI}
          selectable={true}
          selected={true}
        />
      ),
    },
    {
      title: 'Uploading - Selected (with delete)',
      content: (
        <CardView
          appearance={appearance}
          status="uploading"
          progress={0.7}
          actions={[deleteAction]}
          metadata={metadata}
          dataURI={dataURI}
          selectable={true}
          selected={true}
        />
      ),
    },
  ];
};

export const createSelectableCardsWithMenu = (
  appearance: CardAppearance,
  metadata: MediaItemDetails,
  mediaItemType: MediaItemType,
) => {
  const dataURI = mediaItemType === 'file' ? gifDataUri : undefined;

  return [
    {
      title: 'Card with menu',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={metadata}
          dataURI={dataURI}
          actions={actions}
        />
      ),
    },
    {
      title: 'Selected card',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={metadata}
          dataURI={dataURI}
          selectable={true}
          selected={true}
        />
      ),
    },
  ];
};

export const createMissingMetadataFileCards = (appearance: CardAppearance) => {
  const minimumDetails: FileDetails = {};

  const missingNameDetails: FileDetails = deepcopy(genericFileDetails);
  delete missingNameDetails.name;

  const missingFileSizeDetails: FileDetails = deepcopy(genericFileDetails);
  delete missingFileSizeDetails.size;

  const missingMediaTypeDetails: FileDetails = deepcopy(genericFileDetails);
  delete missingMediaTypeDetails.mediaType;

  return [
    {
      title: 'No details',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={minimumDetails}
        />
      ),
    },
    {
      title: 'Missing name',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={missingNameDetails}
          dataURI={gifDataUri}
        />
      ),
    },
    {
      title: 'Missing file size',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={missingFileSizeDetails}
          dataURI={gifDataUri}
        />
      ),
    },
    {
      title: 'Missing media type',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={missingMediaTypeDetails}
          dataURI={gifDataUri}
        />
      ),
    },
    {
      title: 'Missing data uri',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={genericFileDetails}
        />
      ),
    },
  ];
};

export const createMissingMetadataLinkCards = (appearance: CardAppearance) => {
  const minimumDetails: UrlPreview = {
    type: 'link',
    url: 'some-url',
    title: 'Some url title',
  };

  const missingDescriptionPreview: UrlPreview = deepcopy(genericUrlPreview);
  delete missingDescriptionPreview.description;

  const missingSitePreview: UrlPreview = deepcopy(genericUrlPreview);
  delete missingSitePreview.site;

  const missingResourcesPreview: UrlPreview = deepcopy(genericUrlPreview);
  delete missingResourcesPreview.resources;

  const missingThumbnailPreview: UrlPreview = deepcopy(genericUrlPreview);
  if (missingThumbnailPreview.resources) {
    delete missingThumbnailPreview.resources.thumbnail;
  }

  const missingIconPreview: UrlPreview = deepcopy(genericUrlPreview);
  if (missingIconPreview.resources) {
    delete missingIconPreview.resources.icon;
  }

  return [
    {
      title: 'No details',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={minimumDetails}
        />
      ),
    },
    {
      title: 'Missing description',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={missingDescriptionPreview}
        />
      ),
    },
    {
      title: 'Missing site',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={missingSitePreview}
        />
      ),
    },
    {
      title: 'Missing resources',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={missingResourcesPreview}
        />
      ),
    },
    {
      title: 'Missing thumbnail',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={missingThumbnailPreview}
        />
      ),
    },
    {
      title: 'Missing icon',
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={missingIconPreview}
        />
      ),
    },
  ];
};

export const createApiCards = (
  appearance: CardAppearance,
  metadata: MediaItemDetails,
) => {
  // API methods
  const apiCards = [
    {
      title: 'status = complete',
      content: (
        <CardView
          status="complete"
          appearance={appearance}
          metadata={metadata}
          dataURI={gifDataUri}
          onClick={clickHandler}
          onMouseEnter={mouseEnterHandler}
          actions={actions}
        />
      ),
    },
    {
      title: 'status = error',
      content: (
        <CardView
          status="error"
          appearance={appearance}
          metadata={metadata}
          dataURI={gifDataUri}
          onClick={clickHandler}
          onMouseEnter={mouseEnterHandler}
          actions={actions}
        />
      ),
    },
    {
      title: 'status = loading',
      content: (
        <CardView
          status="loading"
          appearance={appearance}
          metadata={metadata}
          dataURI={gifDataUri}
          onClick={clickHandler}
          onMouseEnter={mouseEnterHandler}
          actions={actions}
        />
      ),
    },
  ];

  const uploadCardWithApi = {
    title: 'status = uploading',
    content: (
      <CardView
        status="uploading"
        appearance={appearance}
        metadata={metadata}
        dataURI={gifDataUri}
        onClick={clickHandler}
        onMouseEnter={mouseEnterHandler}
        actions={actions}
      />
    ),
  };

  if (appearance === 'image') {
    return [...apiCards, uploadCardWithApi];
  }

  return apiCards;
};

export const generateStoriesForFilesWithAppearance = (
  appearance: CardAppearance,
) => {
  const fileCards = createFileCardsWithDifferentDataURIs(appearance);

  const fileMediaTypeCards = createFileCardsWithDifferentMediaTypes(appearance);

  // error and loading state
  const fileLoadingAndErrorCards = createErrorAndLoadingCards(
    appearance,
    'file',
  );

  // menu actions
  const fileMenuActionsCards = createMenuActionCards(
    appearance,
    imageFileDetails,
  );

  // upload progress
  const uploadProgressCards = [
    {
      title: '10%',
      content: (
        <CardView
          status="uploading"
          appearance={appearance}
          metadata={genericFileDetails}
          dataURI={gifDataUri}
          progress={0.1}
        />
      ),
    },
    {
      title: '50%',
      content: (
        <CardView
          status="uploading"
          appearance={appearance}
          metadata={genericFileDetails}
          dataURI={gifDataUri}
          progress={0.5}
        />
      ),
    },
    {
      title: '90%',
      content: (
        <CardView
          status="uploading"
          appearance={appearance}
          metadata={genericFileDetails}
          dataURI={gifDataUri}
          progress={0.9}
        />
      ),
    },
    {
      title: 'No dataURI',
      content: (
        <CardView
          status="uploading"
          appearance={appearance}
          metadata={genericFileDetails}
          progress={0.6}
        />
      ),
    },
    {
      title: 'Delete action',
      content: (
        <CardView
          status="uploading"
          appearance={appearance}
          metadata={genericFileDetails}
          progress={0.6}
          actions={[deleteAction]}
        />
      ),
    },
  ];

  // selectable
  const fileSelectableCards = createSelectableCards(
    appearance,
    imageFileDetails,
    'file',
  );
  const selectableWithMenu = createSelectableCardsWithMenu(
    appearance,
    imageFileDetails,
    'file',
  );

  // api cards
  const apiCards = createApiCards(appearance, genericFileDetails);

  // missing metadata and/or data uri
  const fileMissingMetadataOrDataUriCards = createMissingMetadataFileCards(
    appearance,
  );

  return (
    <div>
      <h3>Files</h3>
      <StoryList>{fileCards}</StoryList>

      <h3>Resize modes</h3>
      <StoryList>{createCardsOfDifferentResizeModes()}</StoryList>

      <h3>Sizes (Breakpoints check)</h3>
      <StoryList>
        {createCardsOfDifferentSize(appearance, genericFileDetails, gifDataUri)}
      </StoryList>

      <h4>Media Types - no thumbnails (placeholders)</h4>
      <StoryList>{fileMediaTypeCards}</StoryList>

      <h4>Loading and error states</h4>
      <StoryList>{fileLoadingAndErrorCards}</StoryList>

      <h4>Menu actions</h4>
      <StoryList>{fileMenuActionsCards}</StoryList>

      {appearance === 'image' ? (
        <div>
          <h4>Selectable with menu actions</h4>
          <StoryList display="column">{selectableWithMenu}</StoryList>
        </div>
      ) : null}

      <h4>API methods</h4>
      <StoryList>{apiCards}</StoryList>

      {appearance === 'image' || appearance === 'auto' ? (
        <div>
          <h4>Upload progress</h4>
          <StoryList>{uploadProgressCards}</StoryList>
        </div>
      ) : null}

      {appearance === 'image' || appearance === 'auto' ? (
        <div>
          <h4>Selectable</h4>
          <StoryList>{fileSelectableCards}</StoryList>
        </div>
      ) : null}

      <h4>Missing metadata or data uri</h4>
      <StoryList>{fileMissingMetadataOrDataUriCards}</StoryList>
    </div>
  );
};

export const createErrorAndLoadingCards = (
  appearance: CardAppearance,
  mediaItemType: MediaItemType,
) => {
  return [
    {
      title: 'Loading',
      content: (
        <CardView
          appearance={appearance}
          status="loading"
          mediaItemType={mediaItemType}
        />
      ),
    },
    {
      title: 'Error',
      content: (
        <CardView
          appearance={appearance}
          status="error"
          mediaItemType={mediaItemType}
        />
      ),
    },
  ];
};

export const generateStoriesForLinksWithAppearance = (
  appearance: CardAppearance,
) => {
  const linkCard = [
    {
      title: `Link card "${appearance}"`,
      content: (
        <CardView
          appearance={appearance}
          status="complete"
          metadata={genericLinkDetails}
        />
      ),
    },
  ];

  // loading and error
  const linkLoadingAndErrorCards = createErrorAndLoadingCards(
    appearance,
    'link',
  );

  // menu actions
  const linkMenuActionsCards = createMenuActionCards(
    appearance,
    genericLinkDetails,
  );

  // api methods
  const apiCards = createApiCards(appearance, genericLinkDetails);

  // missing metadata
  const linkMissingMetadataCards = createMissingMetadataLinkCards(appearance);

  return (
    <div>
      <h3>Links</h3>
      <StoryList>{linkCard}</StoryList>

      <h3>Sizes</h3>
      <StoryList>
        {createCardsOfDifferentSize(appearance, genericLinkDetails)}
      </StoryList>

      <h4>Loading and error states</h4>
      <StoryList>{linkLoadingAndErrorCards}</StoryList>

      <h4>Menu actions</h4>
      <StoryList>{linkMenuActionsCards}</StoryList>

      <h4>API methods</h4>
      <StoryList>{apiCards}</StoryList>

      <h4>Missing metadata</h4>
      <StoryList>{linkMissingMetadataCards}</StoryList>
    </div>
  );
};

export const generateStoriesForAppearance = (appearance: CardAppearance) => {
  const fileCardStories =
    appearance !== 'square' && appearance !== 'horizontal'
      ? generateStoriesForFilesWithAppearance(appearance)
      : null;

  const linkCardStories = generateStoriesForLinksWithAppearance(appearance);

  return () => (
    <div>
      <div style={{ margin: '20px 40px' }}>
        {fileCardStories}
        {linkCardStories}
      </div>
    </div>
  );
};
