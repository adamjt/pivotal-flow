const { suggestBranchName, shouldSkipBranchCheck } = require('./utils');

it('should suggest branch name from story name', () => {
  expect(
    suggestBranchName({
      name: 'Add a new button to zoids',
    })
  ).toBe(`add-a-new-button-to-zoids`);

  expect(
    suggestBranchName({
      name: 'Build an end-to-end feature with the new application architecture',
    })
  ).toBe(`build-an-end-to-end-feature`);

  expect(
    suggestBranchName({
      name: 'New ITR Dashboard (no backend integration)',
    })
  ).toBe(`new-itr-dashboard-no-backend`);

  expect(
    suggestBranchName({
      name: '[P0][ITR-1] Validation Errors',
    })
  ).toBe(`p0-itr-1-validation-errors`);

  expect(
    suggestBranchName({
      name: 'Create schema and resolvers for summary table data in app',
    })
  ).toBe(`create-schema-and-resolvers`);

  expect(
    suggestBranchName({
      name: 'Fix Null Pointer Exception when computing tables for customers who have not filed recently.',
    })
  ).toBe(`fix-null-pointer-exception`);

  expect(
    suggestBranchName({
      name: `Fix TypeError: Cannot read property 'foo' of undefined`,
    })
  ).toBe(`fix-type-error-cannot-read`);

  expect(
    suggestBranchName({
      name: 'Add https://example.com in some page',
    })
  ).toBe(`add-https-example-com-in-some`);

  expect(
    suggestBranchName({
      name: 'Add XMLHttpRequest listener',
    })
  ).toBe(`add-xml-http-request-listener`);

  expect(
    suggestBranchName({
      name: 'Add listener for XMLHttpRequest',
    })
  ).toBe(`add-listener-for-xml-http`);
});

it('should not skip when checking out a branch', () => {
  // git checkout bugfix/post-checkout-fails-when-checking_168659719
  expect(
    shouldSkipBranchCheck('61c0ee6200a3f9faeb1e9c24755861582384c1a0', '4c51aece308a74b4890ff67bbb2a0f75379ffd63', '1')
  ).toBeFalsy();
});

it('should skip when checking out a SHA', () => {
  // git checkout 8da0bfffc570e8f2ad01cf91dfe1b124994fa068
  expect(
    shouldSkipBranchCheck('8da0bfffc570e8f2ad01cf91dfe1b124994fa068', '8da0bfffc570e8f2ad01cf91dfe1b124994fa068', '1')
  ).toBeTruthy();
});

it('should skip when checking out a file', () => {
  // git checkout origin/master post-checkout.js
  expect(
    shouldSkipBranchCheck('472c1137ca2bc3da76f83fdd1b665e9ada4e8b1b', '472c1137ca2bc3da76f83fdd1b665e9ada4e8b1b', '1')
  ).toBeTruthy();
});
