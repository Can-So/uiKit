//@flow
import React from 'react';
import Pagination from '../src';

export default () => <Pagination pages={[...Array(10)].map((_, i) => i + 1)} />;
