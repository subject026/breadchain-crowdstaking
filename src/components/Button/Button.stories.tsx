import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "./Button";

export default {
  title: "Core/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <div className="p-8">
    <Button {...args} />
  </div>
);

export const Regular = Template.bind({});
Regular.args = {
  children: "Default",
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "Disabled",
  disabled: true,
};

export const Small = Template.bind({});
Small.args = {
  children: "Small",
  variant: "small",
};

export const Large = Template.bind({});
Large.args = {
  children: "Large",
  variant: "large",
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  children: "Full Width",
  variant: "large",
  fullWidth: true,
};
