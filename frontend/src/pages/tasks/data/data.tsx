import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'


export const statuses = [
  {
    value: 'under_evaluation',
    label: 'Under Evaluation',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'onboarding_in_progress',
    label: 'Onboarding in Progress',
    icon: StopwatchIcon,
  },
  {
    value: 'resigned',
    label: 'Resigned',
    icon: CheckCircledIcon,
  },
  {
    value: 'interview_scheduled',
    label: 'Interview Scheduled',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'onboarded',
    label: 'Onboarded',
    icon: CrossCircledIcon,
  },
]
export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
]
