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
      sport: 'Pickleball',
      status: 'active',
      timeRemaining: 2700,
      icon: 'sports_tennis',
      color: 'primary',
    },
    {
      id: 'field-2',
      name: 'Sân 2',
      sport: 'Bóng chuyền',
      status: 'active',
      timeRemaining: 720,
      icon: 'sports_volleyball',
      color: 'tertiary',
    },
    {
      id: 'field-3',
      name: 'Sân 3',
      sport: 'Pickleball',
      status: 'idle',
      timeRemaining: null,
      icon: 'sports_tennis',
      color: 'primary',
    },
    {
      id: 'field-4',
      name: 'Sân 4',
      sport: 'Cầu lông',
      status: 'idle',
      timeRemaining: null,
      icon: 'sports_tennis',
      color: 'secondary',
    },
    {
      id: 'field-5',
      name: 'Sân 5',
      sport: 'Bóng chuyền',
      status: 'active',
      timeRemaining: 1800,
      icon: 'sports_volleyball',
      color: 'tertiary',
    },
  ];

  const schedules = [
    {
      id: 'sched-1',
      fieldId: 'field-1',
      sport: 'Pickleball',
      date: today,
      startTime: '08:00',
      endTime: '10:00',
      status: 'completed',
      createdAt: timeAgo(180),
    },
    {
      id: 'sched-2',
      fieldId: 'field-1',
      sport: 'Cầu lông',
      date: today,
      startTime: '11:00',
      endTime: '12:00',
      status: 'upcoming',
      createdAt: timeAgo(120),
    },
    {
      id: 'sched-3',
      fieldId: 'field-2',
      sport: 'Bóng chuyền',
      date: today,
      startTime: '14:00',
      endTime: '16:00',
      status: 'ongoing',
      createdAt: timeAgo(300),
    },
    {
      id: 'sched-4',
      fieldId: 'field-2',
      sport: 'Cầu lông',
      date: today,
      startTime: '16:30',
      endTime: '18:30',
      status: 'upcoming',
      createdAt: timeAgo(240),
    },
    {
      id: 'sched-5',
      fieldId: 'field-2',
      sport: 'Pickleball',
      date: today,
      startTime: '19:00',
      endTime: '21:00',
      status: 'upcoming',
      createdAt: timeAgo(200),
    },
    {
      id: 'sched-6',
      fieldId: 'field-3',
      sport: 'Cầu lông',
      date: today,
      startTime: '10:30',
      endTime: '14:00',
      status: 'upcoming',
      createdAt: timeAgo(160),
    },
    {
      id: 'sched-7',
      fieldId: 'field-4',
      sport: 'Cầu lông',
      date: today,
      startTime: '09:00',
      endTime: '11:30',
      status: 'completed',
      createdAt: timeAgo(140),
    },
    {
      id: 'sched-8',
      fieldId: 'field-5',
      sport: 'Pickleball',
      date: today,
      startTime: '14:00',
      endTime: '16:30',
      status: 'upcoming',
      createdAt: timeAgo(60),
    },
  ];

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
