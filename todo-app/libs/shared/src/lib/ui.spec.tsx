import { render } from '@testing-library/react';

import { Button, Card, Input, Checkbox, List, TextArea, Modal, Select, Radio } from './ui';

describe('UI Components', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <div>
        <Button children={undefined} onClick={function (): void {
          throw new Error('Function not implemented.');
        } } />
        <Card children={undefined} />
        <Input value={''} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } />
        <Checkbox checked={false} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } />
        <List items={[]} />
        <TextArea value={''} onChange={function (e: React.ChangeEvent<HTMLTextAreaElement>): void {
          throw new Error('Function not implemented.');
        } } />
        <Modal isOpen={false} onClose={function (): void {
          throw new Error('Function not implemented.');
        } } children={undefined} />
        <Select options={[]} value={''} onChange={function (e: React.ChangeEvent<HTMLSelectElement>): void {
          throw new Error('Function not implemented.');
        } } />
        <Radio name={''} value={''} checked={false} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        } } />
      </div>
    );
    expect(baseElement).toBeTruthy();
  });
});
