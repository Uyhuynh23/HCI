import { format, subHours, subMinutes } from 'date-fns';

function todayStr() {
  return format(new Date(), 'yyyy-MM-dd');
}

function timeAgo(minutesAgo) {
  return subMinutes(new Date(), minutesAgo).toISOString();
}

export function generateSeedData() {
  const today = todayStr();

  const fields = [
    {
      id: 'field-1',
      name: 'Sân 1',
      icon: 'sports_tennis',
      color: 'primary',
    },
    {
      id: 'field-2',
      name: 'Sân 2',
      icon: 'sports_volleyball',
      color: 'tertiary',
    },
    {
      id: 'field-3',
      name: 'Sân 3',
      icon: 'sports_tennis',
      color: 'primary',
    },
    {
      id: 'field-4',
      name: 'Sân 4',
      icon: 'sports_tennis',
      color: 'secondary',
    },
    {
      id: 'field-5',
      name: 'Sân 5',
      icon: 'sports_volleyball',
      color: 'tertiary',
    },
  ];

  function getTimeStr(hoursOffset = 0, minutesOffset = 0) {
    const d = new Date();
    d.setHours(d.getHours() + hoursOffset);
    d.setMinutes(d.getMinutes() + minutesOffset);
    return format(d, 'HH:mm');
  }

  const schedules = [];

  const equipment = [
    {
      id: 'equip-1',
      fieldName: 'Sân 1',
      fieldId: 'field-1',
      connectionStatus: 'connected',
    },
    {
      id: 'equip-2',
      fieldName: 'Sân 2',
      fieldId: 'field-2',
      connectionStatus: 'connected',
    },
    {
      id: 'equip-3',
      fieldName: 'Sân 3',
      fieldId: 'field-3',
      connectionStatus: 'connected',
    },
    {
      id: 'equip-4',
      fieldName: 'Sân 4',
      fieldId: 'field-4',
      connectionStatus: 'connecting',
    },
    {
      id: 'equip-5',
      fieldName: 'Sân 5',
      fieldId: 'field-5',
      connectionStatus: 'searching',
    },
  ];

  const activities = [
    {
      id: 'act-1',
      message: 'Hệ thống chiếu sáng Sân 1 đã được kích hoạt tự động.',
      time: timeAgo(15),
      type: 'info',
    },
    {
      id: 'act-2',
      message: 'Cảnh báo: Kết nối hệ thống đèn Sân 3 có dấu hiệu bất thường.',
      time: timeAgo(45),
      type: 'warning',
    },
    {
      id: 'act-3',
      message: 'Lịch trình sân Pickleball 1 mới được tạo bởi: Nguyễn Văn An.',
      time: timeAgo(90),
      type: 'info',
    },
    {
      id: 'act-4',
      message: 'Sân 2 đã chuyển sang chế độ Bóng chuyền.',
      time: timeAgo(120),
      type: 'info',
    },
    {
      id: 'act-5',
      message: 'Thiết bị Sân 4 đang kết nối lại sau sự cố mất tín hiệu.',
      time: timeAgo(150),
      type: 'warning',
    },
  ];

  return { fields, schedules, equipment, activities };
}
