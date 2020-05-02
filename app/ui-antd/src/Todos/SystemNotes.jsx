import React from 'react';
import { Drawer, Timeline } from 'antd';
import { ClockCircleOutlined, RocketOutlined, CheckCircleTwoTone } from '@ant-design/icons';

const SystemNotes = ({ visible, onClose }) => {
  return (
    <Drawer
      title="System notes"
      onClose={onClose}
      visible={visible}
      placement="right"
    >
      <Timeline>
        <Timeline.Item color="green" dot={<RocketOutlined />}>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item
          dot={<ClockCircleOutlined />}
          color="red"
        >
          Technical testing 2015-09-01
        </Timeline.Item>
        <Timeline.Item dot={<CheckCircleTwoTone twoToneColor="#52c41a" />}>Network problems being solved 2015-09-01</Timeline.Item>
      </Timeline>
    </Drawer>
  );
};

export default SystemNotes;
