export const treeData = [
  {
    id: '1',
    type: 'custom-normal-node',
    data: {
      list: [
        {
          deviceType: {
            label: 'Ammonia Level',
            value: 'Ammonia Level',
          },
          status: {
            label: 'Medium',
            value: 2,
          },
          deviceList: {
            label: '8B-901',
            value: '8B-901',
          },
          operaType: 'AND',
        },
        {
          deviceType: {
            label: 'Ammonia Level',
            value: 'Ammonia Level',
          },
          status: {
            label: 'Medium',
            value: 2,
          },
          deviceList: {
            label: '8B-901',
            value: '8B-901',
          },
          operaType: 'AND',
        },
      ],
      key: '1',
      title: '阿斯蒂芬',
      canAdd: null,
      type: 'DeviceStatus',
    },
    children: [],
    title: '阿斯蒂芬',
    canAdd: null,
  },
  {
    id: '2',
    type: 'custom-condiction',
    data: {
      list: [{}],
      key: '2',
      title: '额哇哇哇哇',
      type: '1',
    },
    children: [
      {
        id: '2-0',
        type: 'custom-condiction-children',
        data: {
          key: '2-0',
          canAdd: null,
          type: 'normal',
        },
        children: [
          {
            id: '2-0-0',
            type: 'custom-stop-automation',
            data: {
              key: '2-0-0',
              type: 'StopAutomation',
            },
            children: [],
          },
        ],
        canAdd: null,
      },
      {
        id: '2-1',
        type: 'custom-condiction-children',
        data: {
          key: '2-1',
          canAdd: null,
          type: 'high',
        },
        children: [
          {
            id: '2-1-0',
            type: 'custom-robot',
            data: {
              list: [
                {
                  operaType: 'AND',
                  type: {
                    label: '1',
                    value: 1,
                  },
                  list: {
                    label: '1',
                    value: 1,
                  },
                },
              ],
              key: '2-1-0',
              title: '撒旦法发',
              canAdd: null,
              type: 'Robot',
            },
            children: [],
            title: '撒旦法发',
            canAdd: null,
          },
          {
            id: '2-1-1',
            type: 'custom-normal-node',
            data: {
              list: [
                {
                  deviceType: {
                    label: 'Ammonia Level',
                    value: 'Ammonia Level',
                  },
                  status: {
                    label: 'Medium',
                    value: 2,
                  },
                  deviceList: {
                    label: '8B-902',
                    value: '8B-902',
                  },
                  operaType: 'AND',
                },
              ],
              key: '2-1-1',
              title: '阿斯顿发射点',
              canAdd: null,
              type: 'DeviceStatus',
            },
            children: [],
            title: '阿斯顿发射点',
            canAdd: null,
          },
          {
            id: '2-1-2',
            type: 'custom-stop-automation',
            data: {
              key: '2-1-2',
              type: 'StopAutomation',
            },
            children: [],
          },
        ],
        canAdd: null,
      },
    ],
    title: '额哇哇哇哇',
  },
]

export const treeData7 = [
  {
    id: '1',
    type: 'custom-normal-node',
    data: {
      list: [
        {
          deviceType: {
            label: 'Ammonia Sensor',
            value: 2,
          },
          status: {
            label: 'high',
            value: 1,
          },
          deviceList: {
            label: 'BA-96',
            value: 7,
          },
          operaType: 'AND',
        },
        {
          deviceType: {
            label: 'Ammonia Level',
            value: 1,
          },
          status: {
            label: 'Normal',
            value: 3,
          },
          deviceList: {
            label: 'BA-94',
            value: 5,
          },
          operaType: 'AND',
        },
      ],
      key: '1',
      title: '1',
      canAdd: '',
      type: 'add',
    },
    children: [],
    title: '1',
    canAdd: '',
  },
  {
    id: '1',
    type: 'custom-normal-node',
    data: {
      list: [
        {
          deviceType: {
            label: 'Motion',
            value: 13,
          },
          status: {
            label: 'Medium',
            value: 2,
          },
          deviceList: {
            label: 'BA-96',
            value: 7,
          },
          operaType: 'AND',
        },
      ],
      key: '1',
      title: '2',
      canAdd: '',
      type: 'DeviceStatus',
    },
    children: [],
    title: '2',
    canAdd: '',
  },
  {
    id: '2',
    type: 'custom-condiction',
    data: {
      list: [
        {
          type: 'add',
          key: '1',
          list: [
            {
              deviceType: {
                label: 'Ammonia Sensor',
                value: 2,
              },
              status: {
                label: 'high',
                value: 1,
              },
              deviceList: {
                label: 'BA-96',
                value: 7,
              },
              operaType: 'AND',
            },
            {
              deviceType: {
                label: 'Ammonia Level',
                value: 1,
              },
              status: {
                label: 'Normal',
                value: 3,
              },
              deviceList: {
                label: 'BA-94',
                value: 5,
              },
              operaType: 'AND',
            },
          ],
          title: '1',
          canAdd: null,
          formik: {
            values: {
              add: {
                list: [
                  {
                    operaType: 'AND',
                    deviceType: null,
                    deviceList: null,
                    status: null,
                  },
                ],
                title: '',
              },
              Condition: {
                list: [],
              },
              DeviceStatus: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
              },
              Time: {
                time: '',
              },
              Robot: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
              },
              Cleaner: {
                title: '',
                list: [{}],
              },
            },
            errors: {},
            touched: {},
            isSubmitting: false,
            isValidating: false,
            submitCount: 0,
            initialValues: {
              add: {
                list: [
                  {
                    operaType: 'AND',
                    deviceType: null,
                    deviceList: null,
                    status: null,
                  },
                ],
                title: '',
              },
              Condition: {
                list: [],
              },
              DeviceStatus: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
              },
              Time: {
                time: '',
              },
              Robot: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
              },
              Cleaner: {
                title: '',
                list: [{}],
              },
            },
            initialErrors: {},
            initialTouched: {},
            isValid: true,
            dirty: false,
            validateOnBlur: true,
            validateOnChange: true,
            validateOnMount: false,
          },
        },
        {
          key: '1',
          type: 'DeviceStatus',
          list: [
            {
              deviceType: {
                label: 'Motion',
                value: 13,
              },
              status: {
                label: 'Medium',
                value: 2,
              },
              deviceList: {
                label: 'BA-96',
                value: 7,
              },
              operaType: 'AND',
            },
          ],
          title: '2',
          canAdd: null,
          formik: {
            values: {
              add: {
                list: [
                  {
                    operaType: 'AND',
                    deviceType: null,
                    deviceList: null,
                    status: null,
                  },
                ],
                title: '',
              },
              Condition: {
                list: [],
              },
              DeviceStatus: {
                list: [
                  {
                    operaType: 'AND',
                    deviceType: {
                      label: 'Motion',
                      value: 13,
                    },
                    deviceList: {
                      label: 'BA-96',
                      value: 7,
                    },
                    status: {
                      label: 'Medium',
                      value: 2,
                    },
                  },
                ],
                title: '2',
              },
              Time: {
                time: '',
              },
              Robot: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
              },
              Cleaner: {
                title: '',
                list: [{}],
              },
            },
            errors: {},
            touched: {},
            isSubmitting: false,
            isValidating: false,
            submitCount: 0,
            initialValues: {
              add: {
                list: [
                  {
                    operaType: 'AND',
                    deviceType: null,
                    deviceList: null,
                    status: null,
                  },
                ],
                title: '',
              },
              Condition: {
                list: [],
              },
              DeviceStatus: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
              },
              Time: {
                time: '',
              },
              Robot: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
              },
              Cleaner: {
                title: '',
                list: [{}],
              },
            },
            initialErrors: {},
            initialTouched: {},
            isValid: true,
            dirty: true,
            validateOnBlur: true,
            validateOnChange: true,
            validateOnMount: false,
          },
        },
      ],
      key: '2',
      title: '2222',
      canAdd: '2',
      type: 'Condition',
    },
    children: [
      {
        id: '2-0',
        type: 'custom-condiction-children',
        data: {
          key: '2-0',
          title: '',
          canAdd: 'add',
          type: 'Medium',
        },
        children: [],
        title: '',
        canAdd: 'add',
      },
    ],
    title: '2222',
    canAdd: '2',
  },
]
export const treeData4 = [
  {
    id: '1',
    type: 'custom-normal-node',
    data: {
      list: [
        {
          deviceType: {
            label: 'Motion',
            value: 13,
          },
          status: {
            label: 'Medium',
            value: 2,
          },
          deviceList: {
            label: 'BA-97',
            value: 8,
          },
          operaType: 'AND',
        },
        {
          deviceType: {
            label: 'Paper Towel Dispenser',
            value: 3,
          },
          status: {
            label: 'Medium',
            value: 2,
          },
          deviceList: {
            label: 'BA-95',
            value: 6,
          },
          operaType: 'OR',
        },
      ],
      key: '1',
      title: '11',
      canAdd: '',
      type: 'add',
    },
    children: [],
    title: '11',
    canAdd: '',
  },
  {
    id: '1',
    type: 'custom-normal-node',
    data: {
      list: [
        {
          deviceType: {
            label: 'Motion',
            value: 13,
          },
          status: {
            label: 'High',
            value: 1,
          },
          deviceList: {
            label: 'BA-96',
            value: 7,
          },
          operaType: 'AND',
        },
        {
          deviceType: {
            label: 'People Counting',
            value: 2,
          },
          status: {
            label: 'High',
            value: 1,
          },
          deviceList: {
            label: 'BA-97',
            value: 8,
          },
          operaType: 'AND',
        },
        {
          deviceType: {
            label: 'Light',
            value: 12,
          },
          status: {
            label: 'High',
            value: 1,
          },
          deviceList: {
            label: 'BA-95',
            value: 6,
          },
          operaType: 'OR',
        },
      ],
      key: '1',
      title: '22',
      canAdd: '',
      type: 'DeviceStatus',
    },
    children: [],
    title: '22',
    canAdd: '',
  },
  {
    id: '2',
    type: 'custom-normal-node',
    data: {
      list: [
        {
          deviceType: {
            label: 'Humidity',
            value: 14,
          },
          status: {
            label: 'Normal',
            value: 3,
          },
          deviceList: {
            label: 'BA-94',
            value: 5,
          },
          operaType: 'AND',
        },
        {
          deviceType: {
            label: 'Ammonia Sensor',
            value: 2,
          },
          status: {
            label: 'High',
            value: 1,
          },
          deviceList: {
            label: 'BA-96',
            value: 7,
          },
          operaType: 'AND',
        },
        {
          deviceType: {
            label: 'People Counting',
            value: 2,
          },
          status: {
            label: 'High',
            value: 1,
          },
          deviceList: {
            label: 'BA-96',
            value: 7,
          },
          operaType: 'AND',
        },
      ],
      key: '2',
      title: '22333',
      canAdd: '',
      type: 'DeviceStatus',
    },
    children: [],
    title: '22333',
    canAdd: '',
  },
  {
    id: '3',
    type: 'custom-condiction',
    data: {
      list: [
        {
          key: '1',
          list: [
            {
              deviceType: {
                label: 'Motion',
                value: 13,
              },
              status: {
                label: 'Medium',
                value: 2,
              },
              deviceList: {
                label: 'BA-97',
                value: 8,
              },
              operaType: 'AND',
            },
            {
              deviceType: {
                label: 'Paper Towel Dispenser',
                value: 3,
              },
              deviceList: {
                label: 'BA-95',
                value: 6,
              },
              status: {
                label: 'Medium',
                value: 2,
              },
              operaType: 'OR',
            },
          ],
          title: '11',
          canAdd: '',
          type: 'add',
        },
        {
          list: [
            {
              deviceType: {
                label: 'Motion',
                value: 13,
              },
              status: {
                label: 'High',
                value: 1,
              },
              deviceList: {
                label: 'BA-96',
                value: 7,
              },
              operaType: 'AND',
            },
            {
              deviceType: {
                label: 'People Counting',
                value: 2,
              },
              status: {
                label: 'High',
                value: 1,
              },
              deviceList: {
                label: 'BA-97',
                value: 8,
              },
              operaType: 'AND',
            },
            {
              deviceType: {
                label: 'Light',
                value: 12,
              },
              deviceList: {
                label: 'BA-95',
                value: 6,
              },
              status: {
                label: 'High',
                value: 1,
              },
              operaType: 'OR',
            },
          ],
          key: '1',
          title: '22',
          canAdd: null,
          type: 'DeviceStatus',
          formik: {
            values: {
              add: {
                list: [
                  {
                    operaType: 'AND',
                    deviceType: null,
                    deviceList: null,
                    status: null,
                  },
                ],
                title: '',
              },
              Condition: {
                list: [],
                title: '',
              },
              DeviceStatus: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
                title: '',
              },
              Time: {
                time: '',
                timeType: '',
              },
              Robot: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
                title: '',
              },
              Cleaner: {
                title: '',
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
              },
            },
            errors: {
              DeviceStatus: {
                title: 'Required title',
                list: [
                  {
                    deviceType: 'Required device type',
                    deviceList: 'Required device list',
                    status: 'Required status',
                  },
                ],
              },
            },
            touched: {},
            isSubmitting: false,
            isValidating: false,
            submitCount: 0,
            initialValues: {
              add: {
                list: [
                  {
                    operaType: 'AND',
                    deviceType: null,
                    deviceList: null,
                    status: null,
                  },
                ],
                title: '',
              },
              Condition: {
                list: [],
              },
              DeviceStatus: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
              },
              Time: {
                time: '',
              },
              Robot: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
              },
              Cleaner: {
                title: '',
                list: [{}],
              },
            },
            initialErrors: {},
            initialTouched: {},
            isValid: false,
            dirty: true,
            validateOnBlur: true,
            validateOnChange: true,
            validateOnMount: false,
          },
        },
        {
          key: '2',
          type: 'DeviceStatus',
          list: [
            {
              deviceType: {
                label: 'Humidity',
                value: 14,
              },
              status: {
                label: 'Normal',
                value: 3,
              },
              deviceList: {
                label: 'BA-94',
                value: 5,
              },
              operaType: 'AND',
            },
            {
              deviceType: {
                label: 'Ammonia Sensor',
                value: 2,
              },
              status: {
                label: 'High',
                value: 1,
              },
              deviceList: {
                label: 'BA-96',
                value: 7,
              },
              operaType: 'AND',
            },
            {
              deviceType: {
                label: 'People Counting',
                value: 2,
              },
              deviceList: {
                label: 'BA-96',
                value: 7,
              },
              status: {
                label: 'High',
                value: 1,
              },
              operaType: 'AND',
            },
          ],
          title: '22333',
          canAdd: null,
          formik: {
            values: {
              add: {
                list: [
                  {
                    operaType: 'AND',
                    deviceType: null,
                    deviceList: null,
                    status: null,
                  },
                ],
                title: '',
              },
              Condition: {
                list: [],
              },
              DeviceStatus: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
              },
              Time: {
                time: '',
              },
              Robot: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
              },
              Cleaner: {
                title: '',
                list: [{}],
              },
            },
            errors: {},
            touched: {},
            isSubmitting: false,
            isValidating: false,
            submitCount: 0,
            initialValues: {
              add: {
                list: [
                  {
                    operaType: 'AND',
                    deviceType: null,
                    deviceList: null,
                    status: null,
                  },
                ],
                title: '',
              },
              Condition: {
                list: [],
              },
              DeviceStatus: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
              },
              Time: {
                time: '',
              },
              Robot: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
              },
              Cleaner: {
                title: '',
                list: [{}],
              },
            },
            initialErrors: {},
            initialTouched: {},
            isValid: true,
            dirty: false,
            validateOnBlur: true,
            validateOnChange: true,
            validateOnMount: false,
          },
        },
      ],
      key: '3',
      title: '78',
      canAdd: '11',
      type: 'Condition',
    },
    children: [
      {
        id: '3-0',
        type: 'custom-condiction-children',
        data: {
          key: '3-0',
          title: '',
          canAdd: '',
          type: 'Medium',
        },
        children: [
          {
            id: '3-0-0',
            type: 'custom-condiction',
            data: {
              list: [
                {
                  key: '1',
                  list: [
                    {
                      deviceType: {
                        label: 'Motion',
                        value: 13,
                      },
                      status: {
                        label: 'Medium',
                        value: 2,
                      },
                      deviceList: {
                        label: 'BA-97',
                        value: 8,
                      },
                      operaType: 'AND',
                    },
                    {
                      deviceType: {
                        label: 'Paper Towel Dispenser',
                        value: 3,
                      },
                      status: {
                        label: 'Medium',
                        value: 2,
                      },
                      deviceList: {
                        label: 'BA-95',
                        value: 6,
                      },
                      operaType: 'OR',
                    },
                  ],
                  title: '11',
                  canAdd: '',
                  type: 'add',
                  formik: {
                    values: {
                      add: {
                        list: [
                          {
                            operaType: 'AND',
                            deviceType: {
                              label: 'Motion',
                              value: 13,
                            },
                            deviceList: {
                              label: 'BA-97',
                              value: 8,
                            },
                            status: {
                              label: 'Medium',
                              value: 2,
                            },
                          },
                          {
                            deviceType: {
                              label: 'Paper Towel Dispenser',
                              value: 3,
                            },
                            deviceList: {
                              label: 'BA-95',
                              value: 6,
                            },
                            status: {
                              label: 'Medium',
                              value: 2,
                            },
                            operaType: 'OR',
                          },
                        ],
                        title: '11',
                      },
                      Condition: {
                        list: [],
                      },
                      DeviceStatus: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                      Time: {
                        time: '',
                      },
                      Robot: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                      Cleaner: {
                        title: '',
                        list: [{}],
                      },
                    },
                    errors: {},
                    touched: {
                      add: {
                        list: [
                          {
                            deviceType: {
                              label: true,
                              value: true,
                            },
                            status: {
                              label: true,
                              value: true,
                            },
                            deviceList: {
                              label: true,
                              value: true,
                            },
                            operaType: true,
                          },
                          {
                            deviceType: {
                              label: true,
                              value: true,
                            },
                            deviceList: {
                              label: true,
                              value: true,
                            },
                            status: {
                              label: true,
                              value: true,
                            },
                            operaType: true,
                          },
                        ],
                        title: true,
                      },
                      Condition: {
                        list: [],
                      },
                      DeviceStatus: {
                        list: [
                          {
                            operaType: true,
                            deviceType: true,
                            deviceList: true,
                            status: true,
                          },
                        ],
                      },
                      Time: {
                        time: true,
                        timeType: true,
                      },
                      Robot: {
                        list: [
                          {
                            operaType: true,
                          },
                        ],
                      },
                      Cleaner: {
                        title: true,
                        list: [
                          {
                            cleaner: true,
                            turnaroundTime: true,
                            turnaroundTimeType: true,
                            reminder: true,
                            reminderType: true,
                          },
                        ],
                      },
                    },
                    isSubmitting: true,
                    isValidating: false,
                    submitCount: 1,
                    initialValues: {
                      add: {
                        list: [
                          {
                            operaType: 'AND',
                            deviceType: null,
                            deviceList: null,
                            status: null,
                          },
                        ],
                        title: '',
                      },
                      Condition: {
                        list: [],
                      },
                      DeviceStatus: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                      Time: {
                        time: '',
                      },
                      Robot: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                      Cleaner: {
                        title: '',
                        list: [{}],
                      },
                    },
                    initialErrors: {},
                    initialTouched: {},
                    isValid: true,
                    dirty: true,
                    validateOnBlur: true,
                    validateOnChange: true,
                    validateOnMount: false,
                  },
                },
                {
                  list: [
                    {
                      deviceType: {
                        label: 'Motion',
                        value: 13,
                      },
                      status: {
                        label: 'High',
                        value: 1,
                      },
                      deviceList: {
                        label: 'BA-96',
                        value: 7,
                      },
                      operaType: 'AND',
                    },
                    {
                      deviceType: {
                        label: 'People Counting',
                        value: 2,
                      },
                      status: {
                        label: 'High',
                        value: 1,
                      },
                      deviceList: {
                        label: 'BA-97',
                        value: 8,
                      },
                      operaType: 'AND',
                    },
                    {
                      deviceType: {
                        label: 'Light',
                        value: 12,
                      },
                      status: {
                        label: 'High',
                        value: 1,
                      },
                      deviceList: {
                        label: 'BA-95',
                        value: 6,
                      },
                      operaType: 'OR',
                    },
                  ],
                  key: '1',
                  title: '22',
                  canAdd: null,
                  type: 'DeviceStatus',
                  formik: {
                    values: {
                      add: {
                        list: [
                          {
                            operaType: 'AND',
                            deviceType: null,
                            deviceList: null,
                            status: null,
                          },
                        ],
                        title: '',
                      },
                      Condition: {
                        list: [],
                        title: '',
                      },
                      DeviceStatus: {
                        list: [
                          {
                            operaType: 'AND',
                            deviceType: {
                              label: 'Motion',
                              value: 13,
                            },
                            deviceList: {
                              label: 'BA-96',
                              value: 7,
                            },
                            status: {
                              label: 'High',
                              value: 1,
                            },
                          },
                          {
                            deviceType: {
                              label: 'People Counting',
                              value: 2,
                            },
                            deviceList: {
                              label: 'BA-97',
                              value: 8,
                            },
                            status: {
                              label: 'High',
                              value: 1,
                            },
                            operaType: 'AND',
                          },
                          {
                            deviceType: {
                              label: 'Light',
                              value: 12,
                            },
                            deviceList: {
                              label: 'BA-95',
                              value: 6,
                            },
                            status: {
                              label: 'High',
                              value: 1,
                            },
                            operaType: 'OR',
                          },
                        ],
                        title: '22',
                      },
                      Time: {
                        time: '',
                        timeType: '',
                      },
                      Robot: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                        title: '',
                      },
                      Cleaner: {
                        title: '',
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                    },
                    errors: {
                      DeviceStatus: {
                        title: 'Required title',
                        list: [
                          {
                            deviceType: 'Required device type',
                            deviceList: 'Required device list',
                            status: 'Required status',
                          },
                        ],
                      },
                    },
                    touched: {
                      add: {
                        list: [
                          {
                            operaType: true,
                            deviceType: true,
                            deviceList: true,
                            status: true,
                          },
                        ],
                        title: true,
                      },
                      Condition: {
                        list: [],
                      },
                      DeviceStatus: {
                        list: [
                          {
                            deviceType: {
                              label: true,
                              value: true,
                            },
                            status: {
                              label: true,
                              value: true,
                            },
                            deviceList: {
                              label: true,
                              value: true,
                            },
                            operaType: true,
                          },
                          {
                            deviceType: {
                              label: true,
                              value: true,
                            },
                            deviceList: {
                              label: true,
                              value: true,
                            },
                            status: {
                              label: true,
                              value: true,
                            },
                            operaType: true,
                          },
                          {
                            deviceType: {
                              label: true,
                              value: true,
                            },
                            deviceList: {
                              label: true,
                              value: true,
                            },
                            status: {
                              label: true,
                              value: true,
                            },
                            operaType: true,
                          },
                        ],
                        title: true,
                      },
                      Time: {
                        time: true,
                        timeType: true,
                      },
                      Robot: {
                        list: [
                          {
                            operaType: true,
                          },
                        ],
                      },
                      Cleaner: {
                        title: true,
                        list: [
                          {
                            cleaner: true,
                            turnaroundTime: true,
                            turnaroundTimeType: true,
                            reminder: true,
                            reminderType: true,
                          },
                        ],
                      },
                    },
                    isSubmitting: true,
                    isValidating: false,
                    submitCount: 1,
                    initialValues: {
                      add: {
                        list: [
                          {
                            operaType: 'AND',
                            deviceType: null,
                            deviceList: null,
                            status: null,
                          },
                        ],
                        title: '',
                      },
                      Condition: {
                        list: [],
                      },
                      DeviceStatus: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                      Time: {
                        time: '',
                      },
                      Robot: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                      Cleaner: {
                        title: '',
                        list: [{}],
                      },
                    },
                    initialErrors: {},
                    initialTouched: {},
                    isValid: true,
                    dirty: true,
                    validateOnBlur: true,
                    validateOnChange: true,
                    validateOnMount: false,
                  },
                },
                {
                  key: '2',
                  type: 'DeviceStatus',
                  list: [
                    {
                      deviceType: {
                        label: 'Humidity',
                        value: 14,
                      },
                      status: {
                        label: 'Normal',
                        value: 3,
                      },
                      deviceList: {
                        label: 'BA-94',
                        value: 5,
                      },
                      operaType: 'AND',
                    },
                    {
                      deviceType: {
                        label: 'Ammonia Sensor',
                        value: 2,
                      },
                      status: {
                        label: 'High',
                        value: 1,
                      },
                      deviceList: {
                        label: 'BA-96',
                        value: 7,
                      },
                      operaType: 'AND',
                    },
                    {
                      deviceType: {
                        label: 'People Counting',
                        value: 2,
                      },
                      status: {
                        label: 'High',
                        value: 1,
                      },
                      deviceList: {
                        label: 'BA-96',
                        value: 7,
                      },
                      operaType: 'AND',
                    },
                  ],
                  title: '22333',
                  canAdd: null,
                  formik: {
                    values: {
                      add: {
                        list: [
                          {
                            operaType: 'AND',
                            deviceType: null,
                            deviceList: null,
                            status: null,
                          },
                        ],
                        title: '',
                      },
                      Condition: {
                        list: [
                          {
                            key: '1',
                            list: [
                              {
                                deviceType: {
                                  label: 'Motion',
                                  value: 13,
                                },
                                status: {
                                  label: 'Medium',
                                  value: 2,
                                },
                                deviceList: {
                                  label: 'BA-97',
                                  value: 8,
                                },
                                operaType: 'AND',
                              },
                              {
                                deviceType: {
                                  label: 'Paper Towel Dispenser',
                                  value: 3,
                                },
                                deviceList: {
                                  label: 'BA-95',
                                  value: 6,
                                },
                                status: {
                                  label: 'Medium',
                                  value: 2,
                                },
                                operaType: 'OR',
                              },
                            ],
                            title: '11',
                            canAdd: '',
                            type: 'add',
                          },
                          {
                            list: [
                              {
                                deviceType: {
                                  label: 'Motion',
                                  value: 13,
                                },
                                status: {
                                  label: 'High',
                                  value: 1,
                                },
                                deviceList: {
                                  label: 'BA-96',
                                  value: 7,
                                },
                                operaType: 'AND',
                              },
                              {
                                deviceType: {
                                  label: 'People Counting',
                                  value: 2,
                                },
                                deviceList: {
                                  label: 'BA-97',
                                  value: 8,
                                },
                                status: {
                                  label: 'High',
                                  value: 1,
                                },
                                operaType: 'AND',
                              },
                            ],
                            key: '1',
                            title: '22',
                            canAdd: null,
                            type: 'DeviceStatus',
                            formik: {
                              values: {
                                add: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                      deviceType: null,
                                      deviceList: null,
                                      status: null,
                                    },
                                  ],
                                  title: '',
                                },
                                Condition: {
                                  list: [],
                                  title: '',
                                },
                                DeviceStatus: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                    },
                                  ],
                                  title: '',
                                },
                                Time: {
                                  time: '',
                                  timeType: '',
                                },
                                Robot: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                    },
                                  ],
                                  title: '',
                                },
                                Cleaner: {
                                  title: '',
                                  list: [
                                    {
                                      operaType: 'AND',
                                    },
                                  ],
                                },
                              },
                              errors: {
                                DeviceStatus: {
                                  title: 'Required title',
                                  list: [
                                    {
                                      deviceType: 'Required device type',
                                      deviceList: 'Required device list',
                                      status: 'Required status',
                                    },
                                  ],
                                },
                              },
                              touched: {},
                              isSubmitting: false,
                              isValidating: false,
                              submitCount: 0,
                              initialValues: {
                                add: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                      deviceType: null,
                                      deviceList: null,
                                      status: null,
                                    },
                                  ],
                                  title: '',
                                },
                                Condition: {
                                  list: [],
                                },
                                DeviceStatus: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                    },
                                  ],
                                },
                                Time: {
                                  time: '',
                                },
                                Robot: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                    },
                                  ],
                                },
                                Cleaner: {
                                  title: '',
                                  list: [{}],
                                },
                              },
                              initialErrors: {},
                              initialTouched: {},
                              isValid: false,
                              dirty: true,
                              validateOnBlur: true,
                              validateOnChange: true,
                              validateOnMount: false,
                            },
                          },
                          {
                            key: '2',
                            type: 'DeviceStatus',
                            list: [
                              {
                                deviceType: {
                                  label: 'Humidity',
                                  value: 14,
                                },
                                status: {
                                  label: 'Normal',
                                  value: 3,
                                },
                                deviceList: {
                                  label: 'BA-94',
                                  value: 5,
                                },
                                operaType: 'AND',
                              },
                              {
                                deviceType: {
                                  label: 'Ammonia Sensor',
                                  value: 2,
                                },
                                deviceList: {
                                  label: 'BA-96',
                                  value: 7,
                                },
                                status: {
                                  label: 'High',
                                  value: 1,
                                },
                                operaType: 'AND',
                              },
                            ],
                            title: '22333',
                            canAdd: null,
                            formik: {
                              values: {
                                add: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                      deviceType: null,
                                      deviceList: null,
                                      status: null,
                                    },
                                  ],
                                  title: '',
                                },
                                Condition: {
                                  list: [],
                                },
                                DeviceStatus: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                    },
                                  ],
                                },
                                Time: {
                                  time: '',
                                },
                                Robot: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                    },
                                  ],
                                },
                                Cleaner: {
                                  title: '',
                                  list: [{}],
                                },
                              },
                              errors: {},
                              touched: {},
                              isSubmitting: false,
                              isValidating: false,
                              submitCount: 0,
                              initialValues: {
                                add: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                      deviceType: null,
                                      deviceList: null,
                                      status: null,
                                    },
                                  ],
                                  title: '',
                                },
                                Condition: {
                                  list: [],
                                },
                                DeviceStatus: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                    },
                                  ],
                                },
                                Time: {
                                  time: '',
                                },
                                Robot: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                    },
                                  ],
                                },
                                Cleaner: {
                                  title: '',
                                  list: [{}],
                                },
                              },
                              initialErrors: {},
                              initialTouched: {},
                              isValid: true,
                              dirty: false,
                              validateOnBlur: true,
                              validateOnChange: true,
                              validateOnMount: false,
                            },
                          },
                        ],
                        type: 'Condition',
                        key: '3',
                        title: '78',
                        mold: '11',
                        data: {
                          key: '1',
                          list: [
                            {
                              deviceType: {
                                label: 'Motion',
                                value: 13,
                              },
                              status: {
                                label: 'Medium',
                                value: 2,
                              },
                              deviceList: {
                                label: 'BA-97',
                                value: 8,
                              },
                              operaType: 'AND',
                            },
                            {
                              deviceType: {
                                label: 'Paper Towel Dispenser',
                                value: 3,
                              },
                              deviceList: {
                                label: 'BA-95',
                                value: 6,
                              },
                              status: {
                                label: 'Medium',
                                value: 2,
                              },
                              operaType: 'OR',
                            },
                          ],
                          title: '11',
                          canAdd: '',
                          type: 'add',
                        },
                        formik: {
                          values: {
                            add: {
                              list: [
                                {
                                  operaType: 'AND',
                                  deviceType: null,
                                  deviceList: null,
                                  status: null,
                                },
                                {
                                  deviceType: {
                                    label: 'Paper Towel Dispenser',
                                    value: 3,
                                  },
                                  deviceList: {
                                    label: 'BA-95',
                                    value: 6,
                                  },
                                  status: {
                                    label: 'Medium',
                                    value: 2,
                                  },
                                  operaType: 'OR',
                                },
                              ],
                              title: '',
                            },
                            Condition: {
                              list: [
                                {
                                  key: '1',
                                  list: [
                                    {
                                      deviceType: {
                                        label: 'Motion',
                                        value: 13,
                                      },
                                      status: {
                                        label: 'Medium',
                                        value: 2,
                                      },
                                      deviceList: {
                                        label: 'BA-97',
                                        value: 8,
                                      },
                                      operaType: 'AND',
                                    },
                                    {
                                      deviceType: {
                                        label: 'Paper Towel Dispenser',
                                        value: 3,
                                      },
                                      status: {
                                        label: 'Medium',
                                        value: 2,
                                      },
                                      deviceList: {
                                        label: 'BA-95',
                                        value: 6,
                                      },
                                      operaType: 'OR',
                                    },
                                  ],
                                  title: '11',
                                  canAdd: '',
                                  type: 'add',
                                  formik: {
                                    values: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: {
                                              label: 'Motion',
                                              value: 13,
                                            },
                                            deviceList: {
                                              label: 'BA-97',
                                              value: 8,
                                            },
                                            status: {
                                              label: 'Medium',
                                              value: 2,
                                            },
                                          },
                                          {
                                            deviceType: {
                                              label: 'Paper Towel Dispenser',
                                              value: 3,
                                            },
                                            deviceList: {
                                              label: 'BA-95',
                                              value: 6,
                                            },
                                            status: {
                                              label: 'Medium',
                                              value: 2,
                                            },
                                            operaType: 'OR',
                                          },
                                        ],
                                        title: '11',
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [{}],
                                      },
                                    },
                                    errors: {},
                                    touched: {
                                      add: {
                                        list: [
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    isSubmitting: true,
                                    isValidating: false,
                                    submitCount: 1,
                                    initialValues: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: null,
                                            deviceList: null,
                                            status: null,
                                          },
                                        ],
                                        title: '',
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [{}],
                                      },
                                    },
                                    initialErrors: {},
                                    initialTouched: {},
                                    isValid: true,
                                    dirty: true,
                                    validateOnBlur: true,
                                    validateOnChange: true,
                                    validateOnMount: false,
                                  },
                                },
                                {
                                  list: [
                                    {
                                      deviceType: {
                                        label: 'Motion',
                                        value: 13,
                                      },
                                      status: {
                                        label: 'High',
                                        value: 1,
                                      },
                                      deviceList: {
                                        label: 'BA-96',
                                        value: 7,
                                      },
                                      operaType: 'AND',
                                    },
                                    {
                                      deviceType: {
                                        label: 'People Counting',
                                        value: 2,
                                      },
                                      status: {
                                        label: 'High',
                                        value: 1,
                                      },
                                      deviceList: {
                                        label: 'BA-97',
                                        value: 8,
                                      },
                                      operaType: 'AND',
                                    },
                                  ],
                                  key: '1',
                                  title: '22',
                                  canAdd: null,
                                  type: 'DeviceStatus',
                                  formik: {
                                    values: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: null,
                                            deviceList: null,
                                            status: null,
                                          },
                                        ],
                                        title: '',
                                      },
                                      Condition: {
                                        list: [],
                                        title: '',
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: {
                                              label: 'Motion',
                                              value: 13,
                                            },
                                            deviceList: {
                                              label: 'BA-96',
                                              value: 7,
                                            },
                                            status: {
                                              label: 'High',
                                              value: 1,
                                            },
                                          },
                                          {
                                            deviceType: {
                                              label: 'People Counting',
                                              value: 2,
                                            },
                                            deviceList: {
                                              label: 'BA-97',
                                              value: 8,
                                            },
                                            status: {
                                              label: 'High',
                                              value: 1,
                                            },
                                            operaType: 'AND',
                                          },
                                        ],
                                        title: '22',
                                      },
                                      Time: {
                                        time: '',
                                        timeType: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                        title: '',
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                    },
                                    errors: {
                                      DeviceStatus: {
                                        title: 'Required title',
                                        list: [
                                          {
                                            deviceType: 'Required device type',
                                            deviceList: 'Required device list',
                                            status: 'Required status',
                                          },
                                        ],
                                      },
                                    },
                                    touched: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    isSubmitting: true,
                                    isValidating: false,
                                    submitCount: 1,
                                    initialValues: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: null,
                                            deviceList: null,
                                            status: null,
                                          },
                                        ],
                                        title: '',
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [{}],
                                      },
                                    },
                                    initialErrors: {},
                                    initialTouched: {},
                                    isValid: true,
                                    dirty: true,
                                    validateOnBlur: true,
                                    validateOnChange: true,
                                    validateOnMount: false,
                                  },
                                },
                                {
                                  key: '2',
                                  type: 'DeviceStatus',
                                  list: [
                                    {
                                      deviceType: {
                                        label: 'Humidity',
                                        value: 14,
                                      },
                                      status: {
                                        label: 'Normal',
                                        value: 3,
                                      },
                                      deviceList: {
                                        label: 'BA-94',
                                        value: 5,
                                      },
                                      operaType: 'AND',
                                    },
                                    {
                                      deviceType: {
                                        label: 'Ammonia Sensor',
                                        value: 2,
                                      },
                                      status: {
                                        label: 'High',
                                        value: 1,
                                      },
                                      deviceList: {
                                        label: 'BA-96',
                                        value: 7,
                                      },
                                      operaType: 'AND',
                                    },
                                  ],
                                  title: '22333',
                                  canAdd: null,
                                  formik: {
                                    values: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: null,
                                            deviceList: null,
                                            status: null,
                                          },
                                        ],
                                        title: '',
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: {
                                              label: 'Humidity',
                                              value: 14,
                                            },
                                            deviceList: {
                                              label: 'BA-94',
                                              value: 5,
                                            },
                                            status: {
                                              label: 'Normal',
                                              value: 3,
                                            },
                                          },
                                          {
                                            deviceType: {
                                              label: 'Ammonia Sensor',
                                              value: 2,
                                            },
                                            deviceList: {
                                              label: 'BA-96',
                                              value: 7,
                                            },
                                            status: {
                                              label: 'High',
                                              value: 1,
                                            },
                                            operaType: 'AND',
                                          },
                                        ],
                                        key: '2',
                                        type: 'DeviceStatus',
                                        title: '22333',
                                        canAdd: null,
                                        formik: {
                                          values: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: null,
                                                  deviceList: null,
                                                  status: null,
                                                },
                                              ],
                                              title: '',
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Time: {
                                              time: '',
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: '',
                                              list: [{}],
                                            },
                                          },
                                          errors: {},
                                          touched: {},
                                          isSubmitting: false,
                                          isValidating: false,
                                          submitCount: 0,
                                          initialValues: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: null,
                                                  deviceList: null,
                                                  status: null,
                                                },
                                              ],
                                              title: '',
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Time: {
                                              time: '',
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: '',
                                              list: [{}],
                                            },
                                          },
                                          initialErrors: {},
                                          initialTouched: {},
                                          isValid: true,
                                          dirty: false,
                                          validateOnBlur: true,
                                          validateOnChange: true,
                                          validateOnMount: false,
                                        },
                                      },
                                      Time: {
                                        time: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [{}],
                                      },
                                    },
                                    errors: {},
                                    touched: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    isSubmitting: true,
                                    isValidating: false,
                                    submitCount: 1,
                                    initialValues: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: null,
                                            deviceList: null,
                                            status: null,
                                          },
                                        ],
                                        title: '',
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [{}],
                                      },
                                    },
                                    initialErrors: {},
                                    initialTouched: {},
                                    isValid: true,
                                    dirty: true,
                                    validateOnBlur: true,
                                    validateOnChange: true,
                                    validateOnMount: false,
                                  },
                                },
                              ],
                            },
                            DeviceStatus: {
                              list: [
                                {
                                  deviceType: {
                                    label: 'Motion',
                                    value: 13,
                                  },
                                  status: {
                                    label: 'High',
                                    value: 1,
                                  },
                                  deviceList: {
                                    label: 'BA-96',
                                    value: 7,
                                  },
                                  operaType: 'AND',
                                },
                                {
                                  deviceType: {
                                    label: 'People Counting',
                                    value: 2,
                                  },
                                  deviceList: {
                                    label: 'BA-97',
                                    value: 8,
                                  },
                                  status: {
                                    label: 'High',
                                    value: 1,
                                  },
                                  operaType: 'AND',
                                },
                              ],
                              title: '22',
                            },
                            Time: {
                              time: '',
                            },
                            Robot: {
                              list: [
                                {
                                  operaType: 'AND',
                                },
                              ],
                            },
                            Cleaner: {
                              title: '',
                              list: [{}],
                            },
                          },
                          errors: {},
                          touched: {
                            add: {
                              list: [
                                {
                                  operaType: true,
                                  deviceType: true,
                                  deviceList: true,
                                  status: true,
                                },
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                              ],
                              title: true,
                            },
                            Condition: {
                              list: [],
                            },
                            DeviceStatus: {
                              list: [
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                              ],
                              title: true,
                            },
                            Time: {
                              time: true,
                              timeType: true,
                            },
                            Robot: {
                              list: [
                                {
                                  operaType: true,
                                },
                              ],
                            },
                            Cleaner: {
                              title: true,
                              list: [
                                {
                                  cleaner: true,
                                  turnaroundTime: true,
                                  turnaroundTimeType: true,
                                  reminder: true,
                                  reminderType: true,
                                },
                              ],
                            },
                          },
                          isSubmitting: false,
                          isValidating: true,
                          submitCount: 0,
                          initialValues: {
                            add: {
                              list: [
                                {
                                  operaType: 'AND',
                                  deviceType: null,
                                  deviceList: null,
                                  status: null,
                                },
                              ],
                              title: '',
                            },
                            Condition: {
                              list: [],
                            },
                            DeviceStatus: {
                              list: [
                                {
                                  operaType: 'AND',
                                },
                              ],
                            },
                            Time: {
                              time: '',
                            },
                            Robot: {
                              list: [
                                {
                                  operaType: 'AND',
                                },
                              ],
                            },
                            Cleaner: {
                              title: '',
                              list: [{}],
                            },
                          },
                          initialErrors: {},
                          initialTouched: {},
                          isValid: true,
                          dirty: true,
                          validateOnBlur: true,
                          validateOnChange: true,
                          validateOnMount: false,
                        },
                      },
                      DeviceStatus: {
                        list: [
                          {
                            operaType: 'AND',
                            deviceType: {
                              label: 'Humidity',
                              value: 14,
                            },
                            deviceList: {
                              label: 'BA-94',
                              value: 5,
                            },
                            status: {
                              label: 'Normal',
                              value: 3,
                            },
                          },
                          {
                            deviceType: {
                              label: 'Ammonia Sensor',
                              value: 2,
                            },
                            deviceList: {
                              label: 'BA-96',
                              value: 7,
                            },
                            status: {
                              label: 'High',
                              value: 1,
                            },
                            operaType: 'AND',
                          },
                          {
                            deviceType: {
                              label: 'People Counting',
                              value: 2,
                            },
                            deviceList: {
                              label: 'BA-96',
                              value: 7,
                            },
                            status: {
                              label: 'High',
                              value: 1,
                            },
                            operaType: 'AND',
                          },
                        ],
                        key: '2',
                        type: 'DeviceStatus',
                        title: '22333',
                        canAdd: null,
                        formik: {
                          values: {
                            add: {
                              list: [
                                {
                                  operaType: 'AND',
                                  deviceType: null,
                                  deviceList: null,
                                  status: null,
                                },
                              ],
                              title: '',
                            },
                            Condition: {
                              list: [
                                {
                                  key: '1',
                                  list: [
                                    {
                                      deviceType: {
                                        label: 'Motion',
                                        value: 13,
                                      },
                                      status: {
                                        label: 'Medium',
                                        value: 2,
                                      },
                                      deviceList: {
                                        label: 'BA-97',
                                        value: 8,
                                      },
                                      operaType: 'AND',
                                    },
                                    {
                                      deviceType: {
                                        label: 'Paper Towel Dispenser',
                                        value: 3,
                                      },
                                      deviceList: {
                                        label: 'BA-95',
                                        value: 6,
                                      },
                                      status: {
                                        label: 'Medium',
                                        value: 2,
                                      },
                                      operaType: 'OR',
                                    },
                                  ],
                                  title: '11',
                                  canAdd: '',
                                  type: 'add',
                                },
                                {
                                  list: [
                                    {
                                      deviceType: {
                                        label: 'Motion',
                                        value: 13,
                                      },
                                      status: {
                                        label: 'High',
                                        value: 1,
                                      },
                                      deviceList: {
                                        label: 'BA-96',
                                        value: 7,
                                      },
                                      operaType: 'AND',
                                    },
                                    {
                                      deviceType: {
                                        label: 'People Counting',
                                        value: 2,
                                      },
                                      deviceList: {
                                        label: 'BA-97',
                                        value: 8,
                                      },
                                      status: {
                                        label: 'High',
                                        value: 1,
                                      },
                                      operaType: 'AND',
                                    },
                                  ],
                                  key: '1',
                                  title: '22',
                                  canAdd: null,
                                  type: 'DeviceStatus',
                                  formik: {
                                    values: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: null,
                                            deviceList: null,
                                            status: null,
                                          },
                                        ],
                                        title: '',
                                      },
                                      Condition: {
                                        list: [],
                                        title: '',
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                        title: '',
                                      },
                                      Time: {
                                        time: '',
                                        timeType: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                        title: '',
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                    },
                                    errors: {
                                      DeviceStatus: {
                                        title: 'Required title',
                                        list: [
                                          {
                                            deviceType: 'Required device type',
                                            deviceList: 'Required device list',
                                            status: 'Required status',
                                          },
                                        ],
                                      },
                                    },
                                    touched: {},
                                    isSubmitting: false,
                                    isValidating: false,
                                    submitCount: 0,
                                    initialValues: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: null,
                                            deviceList: null,
                                            status: null,
                                          },
                                        ],
                                        title: '',
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [{}],
                                      },
                                    },
                                    initialErrors: {},
                                    initialTouched: {},
                                    isValid: false,
                                    dirty: true,
                                    validateOnBlur: true,
                                    validateOnChange: true,
                                    validateOnMount: false,
                                  },
                                },
                                {
                                  key: '2',
                                  type: 'DeviceStatus',
                                  list: [
                                    {
                                      deviceType: {
                                        label: 'Humidity',
                                        value: 14,
                                      },
                                      status: {
                                        label: 'Normal',
                                        value: 3,
                                      },
                                      deviceList: {
                                        label: 'BA-94',
                                        value: 5,
                                      },
                                      operaType: 'AND',
                                    },
                                    {
                                      deviceType: {
                                        label: 'Ammonia Sensor',
                                        value: 2,
                                      },
                                      deviceList: {
                                        label: 'BA-96',
                                        value: 7,
                                      },
                                      status: {
                                        label: 'High',
                                        value: 1,
                                      },
                                      operaType: 'AND',
                                    },
                                  ],
                                  title: '22333',
                                  canAdd: null,
                                  formik: {
                                    values: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: null,
                                            deviceList: null,
                                            status: null,
                                          },
                                        ],
                                        title: '',
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [{}],
                                      },
                                    },
                                    errors: {},
                                    touched: {},
                                    isSubmitting: false,
                                    isValidating: false,
                                    submitCount: 0,
                                    initialValues: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: null,
                                            deviceList: null,
                                            status: null,
                                          },
                                        ],
                                        title: '',
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [{}],
                                      },
                                    },
                                    initialErrors: {},
                                    initialTouched: {},
                                    isValid: true,
                                    dirty: false,
                                    validateOnBlur: true,
                                    validateOnChange: true,
                                    validateOnMount: false,
                                  },
                                },
                              ],
                              type: 'Condition',
                              key: '3',
                              title: '78',
                              mold: '11',
                              data: {
                                key: '1',
                                list: [
                                  {
                                    deviceType: {
                                      label: 'Motion',
                                      value: 13,
                                    },
                                    status: {
                                      label: 'Medium',
                                      value: 2,
                                    },
                                    deviceList: {
                                      label: 'BA-97',
                                      value: 8,
                                    },
                                    operaType: 'AND',
                                  },
                                  {
                                    deviceType: {
                                      label: 'Paper Towel Dispenser',
                                      value: 3,
                                    },
                                    deviceList: {
                                      label: 'BA-95',
                                      value: 6,
                                    },
                                    status: {
                                      label: 'Medium',
                                      value: 2,
                                    },
                                    operaType: 'OR',
                                  },
                                ],
                                title: '11',
                                canAdd: '',
                                type: 'add',
                              },
                              formik: {
                                values: {
                                  add: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                        deviceType: null,
                                        deviceList: null,
                                        status: null,
                                      },
                                      {
                                        deviceType: {
                                          label: 'Paper Towel Dispenser',
                                          value: 3,
                                        },
                                        deviceList: {
                                          label: 'BA-95',
                                          value: 6,
                                        },
                                        status: {
                                          label: 'Medium',
                                          value: 2,
                                        },
                                        operaType: 'OR',
                                      },
                                    ],
                                    title: '',
                                  },
                                  Condition: {
                                    list: [
                                      {
                                        key: '1',
                                        list: [
                                          {
                                            deviceType: {
                                              label: 'Motion',
                                              value: 13,
                                            },
                                            status: {
                                              label: 'Medium',
                                              value: 2,
                                            },
                                            deviceList: {
                                              label: 'BA-97',
                                              value: 8,
                                            },
                                            operaType: 'AND',
                                          },
                                          {
                                            deviceType: {
                                              label: 'Paper Towel Dispenser',
                                              value: 3,
                                            },
                                            status: {
                                              label: 'Medium',
                                              value: 2,
                                            },
                                            deviceList: {
                                              label: 'BA-95',
                                              value: 6,
                                            },
                                            operaType: 'OR',
                                          },
                                        ],
                                        title: '11',
                                        canAdd: '',
                                        type: 'add',
                                        formik: {
                                          values: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: {
                                                    label: 'Motion',
                                                    value: 13,
                                                  },
                                                  deviceList: {
                                                    label: 'BA-97',
                                                    value: 8,
                                                  },
                                                  status: {
                                                    label: 'Medium',
                                                    value: 2,
                                                  },
                                                },
                                                {
                                                  deviceType: {
                                                    label: 'Paper Towel Dispenser',
                                                    value: 3,
                                                  },
                                                  deviceList: {
                                                    label: 'BA-95',
                                                    value: 6,
                                                  },
                                                  status: {
                                                    label: 'Medium',
                                                    value: 2,
                                                  },
                                                  operaType: 'OR',
                                                },
                                              ],
                                              title: '11',
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Time: {
                                              time: '',
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: '',
                                              list: [{}],
                                            },
                                          },
                                          errors: {},
                                          touched: {
                                            add: {
                                              list: [
                                                {
                                                  deviceType: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  status: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  deviceList: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  operaType: true,
                                                },
                                                {
                                                  deviceType: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  deviceList: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  status: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  operaType: true,
                                                },
                                              ],
                                              title: true,
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: true,
                                                  deviceType: true,
                                                  deviceList: true,
                                                  status: true,
                                                },
                                              ],
                                            },
                                            Time: {
                                              time: true,
                                              timeType: true,
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: true,
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: true,
                                              list: [
                                                {
                                                  cleaner: true,
                                                  turnaroundTime: true,
                                                  turnaroundTimeType: true,
                                                  reminder: true,
                                                  reminderType: true,
                                                },
                                              ],
                                            },
                                          },
                                          isSubmitting: true,
                                          isValidating: false,
                                          submitCount: 1,
                                          initialValues: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: null,
                                                  deviceList: null,
                                                  status: null,
                                                },
                                              ],
                                              title: '',
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Time: {
                                              time: '',
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: '',
                                              list: [{}],
                                            },
                                          },
                                          initialErrors: {},
                                          initialTouched: {},
                                          isValid: true,
                                          dirty: true,
                                          validateOnBlur: true,
                                          validateOnChange: true,
                                          validateOnMount: false,
                                        },
                                      },
                                      {
                                        list: [
                                          {
                                            deviceType: {
                                              label: 'Motion',
                                              value: 13,
                                            },
                                            status: {
                                              label: 'High',
                                              value: 1,
                                            },
                                            deviceList: {
                                              label: 'BA-96',
                                              value: 7,
                                            },
                                            operaType: 'AND',
                                          },
                                          {
                                            deviceType: {
                                              label: 'People Counting',
                                              value: 2,
                                            },
                                            status: {
                                              label: 'High',
                                              value: 1,
                                            },
                                            deviceList: {
                                              label: 'BA-97',
                                              value: 8,
                                            },
                                            operaType: 'AND',
                                          },
                                        ],
                                        key: '1',
                                        title: '22',
                                        canAdd: null,
                                        type: 'DeviceStatus',
                                        formik: {
                                          values: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: null,
                                                  deviceList: null,
                                                  status: null,
                                                },
                                              ],
                                              title: '',
                                            },
                                            Condition: {
                                              list: [],
                                              title: '',
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: {
                                                    label: 'Motion',
                                                    value: 13,
                                                  },
                                                  deviceList: {
                                                    label: 'BA-96',
                                                    value: 7,
                                                  },
                                                  status: {
                                                    label: 'High',
                                                    value: 1,
                                                  },
                                                },
                                                {
                                                  deviceType: {
                                                    label: 'People Counting',
                                                    value: 2,
                                                  },
                                                  deviceList: {
                                                    label: 'BA-97',
                                                    value: 8,
                                                  },
                                                  status: {
                                                    label: 'High',
                                                    value: 1,
                                                  },
                                                  operaType: 'AND',
                                                },
                                              ],
                                              title: '22',
                                            },
                                            Time: {
                                              time: '',
                                              timeType: '',
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                              title: '',
                                            },
                                            Cleaner: {
                                              title: '',
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                          },
                                          errors: {
                                            DeviceStatus: {
                                              title: 'Required title',
                                              list: [
                                                {
                                                  deviceType: 'Required device type',
                                                  deviceList: 'Required device list',
                                                  status: 'Required status',
                                                },
                                              ],
                                            },
                                          },
                                          touched: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: true,
                                                  deviceType: true,
                                                  deviceList: true,
                                                  status: true,
                                                },
                                              ],
                                              title: true,
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  deviceType: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  status: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  deviceList: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  operaType: true,
                                                },
                                                {
                                                  deviceType: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  deviceList: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  status: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  operaType: true,
                                                },
                                              ],
                                              title: true,
                                            },
                                            Time: {
                                              time: true,
                                              timeType: true,
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: true,
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: true,
                                              list: [
                                                {
                                                  cleaner: true,
                                                  turnaroundTime: true,
                                                  turnaroundTimeType: true,
                                                  reminder: true,
                                                  reminderType: true,
                                                },
                                              ],
                                            },
                                          },
                                          isSubmitting: true,
                                          isValidating: false,
                                          submitCount: 1,
                                          initialValues: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: null,
                                                  deviceList: null,
                                                  status: null,
                                                },
                                              ],
                                              title: '',
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Time: {
                                              time: '',
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: '',
                                              list: [{}],
                                            },
                                          },
                                          initialErrors: {},
                                          initialTouched: {},
                                          isValid: true,
                                          dirty: true,
                                          validateOnBlur: true,
                                          validateOnChange: true,
                                          validateOnMount: false,
                                        },
                                      },
                                      {
                                        key: '2',
                                        type: 'DeviceStatus',
                                        list: [
                                          {
                                            deviceType: {
                                              label: 'Humidity',
                                              value: 14,
                                            },
                                            status: {
                                              label: 'Normal',
                                              value: 3,
                                            },
                                            deviceList: {
                                              label: 'BA-94',
                                              value: 5,
                                            },
                                            operaType: 'AND',
                                          },
                                          {
                                            deviceType: {
                                              label: 'Ammonia Sensor',
                                              value: 2,
                                            },
                                            status: {
                                              label: 'High',
                                              value: 1,
                                            },
                                            deviceList: {
                                              label: 'BA-96',
                                              value: 7,
                                            },
                                            operaType: 'AND',
                                          },
                                        ],
                                        title: '22333',
                                        canAdd: null,
                                        formik: {
                                          values: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: null,
                                                  deviceList: null,
                                                  status: null,
                                                },
                                              ],
                                              title: '',
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: {
                                                    label: 'Humidity',
                                                    value: 14,
                                                  },
                                                  deviceList: {
                                                    label: 'BA-94',
                                                    value: 5,
                                                  },
                                                  status: {
                                                    label: 'Normal',
                                                    value: 3,
                                                  },
                                                },
                                                {
                                                  deviceType: {
                                                    label: 'Ammonia Sensor',
                                                    value: 2,
                                                  },
                                                  deviceList: {
                                                    label: 'BA-96',
                                                    value: 7,
                                                  },
                                                  status: {
                                                    label: 'High',
                                                    value: 1,
                                                  },
                                                  operaType: 'AND',
                                                },
                                              ],
                                              key: '2',
                                              type: 'DeviceStatus',
                                              title: '22333',
                                              canAdd: null,
                                              formik: {
                                                values: {
                                                  add: {
                                                    list: [
                                                      {
                                                        operaType: 'AND',
                                                        deviceType: null,
                                                        deviceList: null,
                                                        status: null,
                                                      },
                                                    ],
                                                    title: '',
                                                  },
                                                  Condition: {
                                                    list: [],
                                                  },
                                                  DeviceStatus: {
                                                    list: [
                                                      {
                                                        operaType: 'AND',
                                                      },
                                                    ],
                                                  },
                                                  Time: {
                                                    time: '',
                                                  },
                                                  Robot: {
                                                    list: [
                                                      {
                                                        operaType: 'AND',
                                                      },
                                                    ],
                                                  },
                                                  Cleaner: {
                                                    title: '',
                                                    list: [{}],
                                                  },
                                                },
                                                errors: {},
                                                touched: {},
                                                isSubmitting: false,
                                                isValidating: false,
                                                submitCount: 0,
                                                initialValues: {
                                                  add: {
                                                    list: [
                                                      {
                                                        operaType: 'AND',
                                                        deviceType: null,
                                                        deviceList: null,
                                                        status: null,
                                                      },
                                                    ],
                                                    title: '',
                                                  },
                                                  Condition: {
                                                    list: [],
                                                  },
                                                  DeviceStatus: {
                                                    list: [
                                                      {
                                                        operaType: 'AND',
                                                      },
                                                    ],
                                                  },
                                                  Time: {
                                                    time: '',
                                                  },
                                                  Robot: {
                                                    list: [
                                                      {
                                                        operaType: 'AND',
                                                      },
                                                    ],
                                                  },
                                                  Cleaner: {
                                                    title: '',
                                                    list: [{}],
                                                  },
                                                },
                                                initialErrors: {},
                                                initialTouched: {},
                                                isValid: true,
                                                dirty: false,
                                                validateOnBlur: true,
                                                validateOnChange: true,
                                                validateOnMount: false,
                                              },
                                            },
                                            Time: {
                                              time: '',
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: '',
                                              list: [{}],
                                            },
                                          },
                                          errors: {},
                                          touched: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: true,
                                                  deviceType: true,
                                                  deviceList: true,
                                                  status: true,
                                                },
                                              ],
                                              title: true,
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  deviceType: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  status: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  deviceList: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  operaType: true,
                                                },
                                                {
                                                  deviceType: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  deviceList: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  status: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  operaType: true,
                                                },
                                              ],
                                              title: true,
                                            },
                                            Time: {
                                              time: true,
                                              timeType: true,
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: true,
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: true,
                                              list: [
                                                {
                                                  cleaner: true,
                                                  turnaroundTime: true,
                                                  turnaroundTimeType: true,
                                                  reminder: true,
                                                  reminderType: true,
                                                },
                                              ],
                                            },
                                          },
                                          isSubmitting: true,
                                          isValidating: false,
                                          submitCount: 1,
                                          initialValues: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: null,
                                                  deviceList: null,
                                                  status: null,
                                                },
                                              ],
                                              title: '',
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Time: {
                                              time: '',
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: '',
                                              list: [{}],
                                            },
                                          },
                                          initialErrors: {},
                                          initialTouched: {},
                                          isValid: true,
                                          dirty: true,
                                          validateOnBlur: true,
                                          validateOnChange: true,
                                          validateOnMount: false,
                                        },
                                      },
                                    ],
                                  },
                                  DeviceStatus: {
                                    list: [
                                      {
                                        deviceType: {
                                          label: 'Motion',
                                          value: 13,
                                        },
                                        status: {
                                          label: 'High',
                                          value: 1,
                                        },
                                        deviceList: {
                                          label: 'BA-96',
                                          value: 7,
                                        },
                                        operaType: 'AND',
                                      },
                                      {
                                        deviceType: {
                                          label: 'People Counting',
                                          value: 2,
                                        },
                                        deviceList: {
                                          label: 'BA-97',
                                          value: 8,
                                        },
                                        status: {
                                          label: 'High',
                                          value: 1,
                                        },
                                        operaType: 'AND',
                                      },
                                    ],
                                    title: '22',
                                  },
                                  Time: {
                                    time: '',
                                  },
                                  Robot: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                      },
                                    ],
                                  },
                                  Cleaner: {
                                    title: '',
                                    list: [{}],
                                  },
                                },
                                errors: {},
                                touched: {
                                  add: {
                                    list: [
                                      {
                                        operaType: true,
                                        deviceType: true,
                                        deviceList: true,
                                        status: true,
                                      },
                                      {
                                        deviceType: {
                                          label: true,
                                          value: true,
                                        },
                                        deviceList: {
                                          label: true,
                                          value: true,
                                        },
                                        status: {
                                          label: true,
                                          value: true,
                                        },
                                        operaType: true,
                                      },
                                    ],
                                    title: true,
                                  },
                                  Condition: {
                                    list: [],
                                  },
                                  DeviceStatus: {
                                    list: [
                                      {
                                        deviceType: {
                                          label: true,
                                          value: true,
                                        },
                                        status: {
                                          label: true,
                                          value: true,
                                        },
                                        deviceList: {
                                          label: true,
                                          value: true,
                                        },
                                        operaType: true,
                                      },
                                      {
                                        deviceType: {
                                          label: true,
                                          value: true,
                                        },
                                        deviceList: {
                                          label: true,
                                          value: true,
                                        },
                                        status: {
                                          label: true,
                                          value: true,
                                        },
                                        operaType: true,
                                      },
                                    ],
                                    title: true,
                                  },
                                  Time: {
                                    time: true,
                                    timeType: true,
                                  },
                                  Robot: {
                                    list: [
                                      {
                                        operaType: true,
                                      },
                                    ],
                                  },
                                  Cleaner: {
                                    title: true,
                                    list: [
                                      {
                                        cleaner: true,
                                        turnaroundTime: true,
                                        turnaroundTimeType: true,
                                        reminder: true,
                                        reminderType: true,
                                      },
                                    ],
                                  },
                                },
                                isSubmitting: false,
                                isValidating: true,
                                submitCount: 0,
                                initialValues: {
                                  add: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                        deviceType: null,
                                        deviceList: null,
                                        status: null,
                                      },
                                    ],
                                    title: '',
                                  },
                                  Condition: {
                                    list: [],
                                  },
                                  DeviceStatus: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                      },
                                    ],
                                  },
                                  Time: {
                                    time: '',
                                  },
                                  Robot: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                      },
                                    ],
                                  },
                                  Cleaner: {
                                    title: '',
                                    list: [{}],
                                  },
                                },
                                initialErrors: {},
                                initialTouched: {},
                                isValid: true,
                                dirty: true,
                                validateOnBlur: true,
                                validateOnChange: true,
                                validateOnMount: false,
                              },
                            },
                            DeviceStatus: {
                              list: [
                                {
                                  operaType: 'AND',
                                  deviceType: {
                                    label: 'Humidity',
                                    value: 14,
                                  },
                                  deviceList: {
                                    label: 'BA-94',
                                    value: 5,
                                  },
                                  status: {
                                    label: 'Normal',
                                    value: 3,
                                  },
                                },
                                {
                                  deviceType: {
                                    label: 'Ammonia Sensor',
                                    value: 2,
                                  },
                                  deviceList: {
                                    label: 'BA-96',
                                    value: 7,
                                  },
                                  status: {
                                    label: 'High',
                                    value: 1,
                                  },
                                  operaType: 'AND',
                                },
                              ],
                              key: '2',
                              type: 'DeviceStatus',
                              title: '22333',
                              canAdd: null,
                              formik: {
                                values: {
                                  add: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                        deviceType: null,
                                        deviceList: null,
                                        status: null,
                                      },
                                    ],
                                    title: '',
                                  },
                                  Condition: {
                                    list: [],
                                  },
                                  DeviceStatus: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                      },
                                    ],
                                  },
                                  Time: {
                                    time: '',
                                  },
                                  Robot: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                      },
                                    ],
                                  },
                                  Cleaner: {
                                    title: '',
                                    list: [{}],
                                  },
                                },
                                errors: {},
                                touched: {},
                                isSubmitting: false,
                                isValidating: false,
                                submitCount: 0,
                                initialValues: {
                                  add: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                        deviceType: null,
                                        deviceList: null,
                                        status: null,
                                      },
                                    ],
                                    title: '',
                                  },
                                  Condition: {
                                    list: [],
                                  },
                                  DeviceStatus: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                      },
                                    ],
                                  },
                                  Time: {
                                    time: '',
                                  },
                                  Robot: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                      },
                                    ],
                                  },
                                  Cleaner: {
                                    title: '',
                                    list: [{}],
                                  },
                                },
                                initialErrors: {},
                                initialTouched: {},
                                isValid: true,
                                dirty: false,
                                validateOnBlur: true,
                                validateOnChange: true,
                                validateOnMount: false,
                              },
                            },
                            Time: {
                              time: '',
                            },
                            Robot: {
                              list: [
                                {
                                  operaType: 'AND',
                                },
                              ],
                            },
                            Cleaner: {
                              title: '',
                              list: [{}],
                            },
                          },
                          errors: {},
                          touched: {
                            add: {
                              list: [
                                {
                                  operaType: true,
                                  deviceType: true,
                                  deviceList: true,
                                  status: true,
                                },
                              ],
                              title: true,
                            },
                            Condition: {
                              list: [],
                            },
                            DeviceStatus: {
                              list: [
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                              ],
                              title: true,
                            },
                            Time: {
                              time: true,
                              timeType: true,
                            },
                            Robot: {
                              list: [
                                {
                                  operaType: true,
                                },
                              ],
                            },
                            Cleaner: {
                              title: true,
                              list: [
                                {
                                  cleaner: true,
                                  turnaroundTime: true,
                                  turnaroundTimeType: true,
                                  reminder: true,
                                  reminderType: true,
                                },
                              ],
                            },
                          },
                          isSubmitting: false,
                          isValidating: false,
                          submitCount: 0,
                          initialValues: {
                            add: {
                              list: [
                                {
                                  operaType: 'AND',
                                  deviceType: null,
                                  deviceList: null,
                                  status: null,
                                },
                              ],
                              title: '',
                            },
                            Condition: {
                              list: [],
                            },
                            DeviceStatus: {
                              list: [
                                {
                                  operaType: 'AND',
                                },
                              ],
                            },
                            Time: {
                              time: '',
                            },
                            Robot: {
                              list: [
                                {
                                  operaType: 'AND',
                                },
                              ],
                            },
                            Cleaner: {
                              title: '',
                              list: [{}],
                            },
                          },
                          initialErrors: {},
                          initialTouched: {},
                          isValid: true,
                          dirty: true,
                          validateOnBlur: true,
                          validateOnChange: true,
                          validateOnMount: false,
                        },
                      },
                      Time: {
                        time: '',
                      },
                      Robot: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                      Cleaner: {
                        title: '',
                        list: [{}],
                      },
                    },
                    errors: {},
                    touched: {
                      add: {
                        list: [
                          {
                            operaType: true,
                            deviceType: true,
                            deviceList: true,
                            status: true,
                          },
                        ],
                        title: true,
                      },
                      Condition: {
                        list: [
                          {
                            key: true,
                            list: [
                              {
                                deviceType: {
                                  label: true,
                                  value: true,
                                },
                                status: {
                                  label: true,
                                  value: true,
                                },
                                deviceList: {
                                  label: true,
                                  value: true,
                                },
                                operaType: true,
                              },
                              {
                                deviceType: {
                                  label: true,
                                  value: true,
                                },
                                deviceList: {
                                  label: true,
                                  value: true,
                                },
                                status: {
                                  label: true,
                                  value: true,
                                },
                                operaType: true,
                              },
                            ],
                            title: true,
                            canAdd: true,
                            type: true,
                            editNode: true,
                            addNewType: true,
                          },
                          {
                            list: [
                              {
                                deviceType: {
                                  label: true,
                                  value: true,
                                },
                                status: {
                                  label: true,
                                  value: true,
                                },
                                deviceList: {
                                  label: true,
                                  value: true,
                                },
                                operaType: true,
                              },
                              {
                                deviceType: {
                                  label: true,
                                  value: true,
                                },
                                deviceList: {
                                  label: true,
                                  value: true,
                                },
                                status: {
                                  label: true,
                                  value: true,
                                },
                                operaType: true,
                              },
                            ],
                            key: true,
                            title: true,
                            canAdd: true,
                            type: true,
                            addNewType: true,
                            formik: {
                              values: {
                                add: {
                                  list: [
                                    {
                                      operaType: true,
                                      deviceType: true,
                                      deviceList: true,
                                      status: true,
                                    },
                                  ],
                                  title: true,
                                },
                                Condition: {
                                  list: [],
                                  title: true,
                                },
                                DeviceStatus: {
                                  list: [
                                    {
                                      operaType: true,
                                      deviceType: true,
                                      deviceList: true,
                                      status: true,
                                    },
                                  ],
                                  title: true,
                                },
                                Time: {
                                  time: true,
                                  timeType: true,
                                },
                                Robot: {
                                  list: [
                                    {
                                      operaType: true,
                                    },
                                  ],
                                  title: true,
                                },
                                Cleaner: {
                                  title: true,
                                  list: [
                                    {
                                      operaType: true,
                                    },
                                  ],
                                },
                              },
                              errors: {
                                DeviceStatus: {
                                  title: true,
                                  list: [
                                    {
                                      deviceType: true,
                                      deviceList: true,
                                      status: true,
                                    },
                                  ],
                                },
                              },
                              touched: {},
                              status: true,
                              isSubmitting: true,
                              isValidating: true,
                              submitCount: true,
                              initialValues: {
                                add: {
                                  list: [
                                    {
                                      operaType: true,
                                      deviceType: true,
                                      deviceList: true,
                                      status: true,
                                    },
                                  ],
                                  title: true,
                                },
                                Condition: {
                                  list: [],
                                },
                                DeviceStatus: {
                                  list: [
                                    {
                                      operaType: true,
                                      deviceType: true,
                                      deviceList: true,
                                      status: true,
                                    },
                                  ],
                                },
                                Time: {
                                  time: true,
                                  timeType: true,
                                },
                                Robot: {
                                  list: [
                                    {
                                      operaType: true,
                                    },
                                  ],
                                },
                                Cleaner: {
                                  title: true,
                                  list: [
                                    {
                                      cleaner: true,
                                      turnaroundTime: true,
                                      turnaroundTimeType: true,
                                      reminder: true,
                                      reminderType: true,
                                    },
                                  ],
                                },
                              },
                              initialErrors: {},
                              initialTouched: {},
                              initialStatus: true,
                              handleBlur: true,
                              handleChange: true,
                              handleReset: true,
                              handleSubmit: true,
                              resetForm: true,
                              setErrors: true,
                              setFormikState: true,
                              setFieldTouched: true,
                              setFieldValue: true,
                              setFieldError: true,
                              setStatus: true,
                              setSubmitting: true,
                              setTouched: true,
                              setValues: true,
                              submitForm: true,
                              validateForm: true,
                              validateField: true,
                              isValid: true,
                              dirty: true,
                              unregisterField: true,
                              registerField: true,
                              getFieldProps: true,
                              getFieldMeta: true,
                              getFieldHelpers: true,
                              validateOnBlur: true,
                              validateOnChange: true,
                              validateOnMount: true,
                            },
                          },
                          {
                            key: true,
                            type: true,
                            editNode: true,
                            list: [
                              {
                                deviceType: {
                                  label: true,
                                  value: true,
                                },
                                status: {
                                  label: true,
                                  value: true,
                                },
                                deviceList: {
                                  label: true,
                                  value: true,
                                },
                                operaType: true,
                              },
                              {
                                deviceType: {
                                  label: true,
                                  value: true,
                                },
                                deviceList: {
                                  label: true,
                                  value: true,
                                },
                                status: {
                                  label: true,
                                  value: true,
                                },
                                operaType: true,
                              },
                            ],
                            title: true,
                            canAdd: true,
                            addNewType: true,
                            formik: {
                              values: {
                                add: {
                                  list: [
                                    {
                                      operaType: true,
                                      deviceType: true,
                                      deviceList: true,
                                      status: true,
                                    },
                                  ],
                                  title: true,
                                },
                                Condition: {
                                  list: [],
                                },
                                DeviceStatus: {
                                  list: [
                                    {
                                      operaType: true,
                                      deviceType: true,
                                      deviceList: true,
                                      status: true,
                                    },
                                  ],
                                },
                                Time: {
                                  time: true,
                                  timeType: true,
                                },
                                Robot: {
                                  list: [
                                    {
                                      operaType: true,
                                    },
                                  ],
                                },
                                Cleaner: {
                                  title: true,
                                  list: [
                                    {
                                      cleaner: true,
                                      turnaroundTime: true,
                                      turnaroundTimeType: true,
                                      reminder: true,
                                      reminderType: true,
                                    },
                                  ],
                                },
                              },
                              errors: {},
                              touched: {},
                              status: true,
                              isSubmitting: true,
                              isValidating: true,
                              submitCount: true,
                              initialValues: {
                                add: {
                                  list: [
                                    {
                                      operaType: true,
                                      deviceType: true,
                                      deviceList: true,
                                      status: true,
                                    },
                                  ],
                                  title: true,
                                },
                                Condition: {
                                  list: [],
                                },
                                DeviceStatus: {
                                  list: [
                                    {
                                      operaType: true,
                                      deviceType: true,
                                      deviceList: true,
                                      status: true,
                                    },
                                  ],
                                },
                                Time: {
                                  time: true,
                                  timeType: true,
                                },
                                Robot: {
                                  list: [
                                    {
                                      operaType: true,
                                    },
                                  ],
                                },
                                Cleaner: {
                                  title: true,
                                  list: [
                                    {
                                      cleaner: true,
                                      turnaroundTime: true,
                                      turnaroundTimeType: true,
                                      reminder: true,
                                      reminderType: true,
                                    },
                                  ],
                                },
                              },
                              initialErrors: {},
                              initialTouched: {},
                              initialStatus: true,
                              handleBlur: true,
                              handleChange: true,
                              handleReset: true,
                              handleSubmit: true,
                              resetForm: true,
                              setErrors: true,
                              setFormikState: true,
                              setFieldTouched: true,
                              setFieldValue: true,
                              setFieldError: true,
                              setStatus: true,
                              setSubmitting: true,
                              setTouched: true,
                              setValues: true,
                              submitForm: true,
                              validateForm: true,
                              validateField: true,
                              isValid: true,
                              dirty: true,
                              unregisterField: true,
                              registerField: true,
                              getFieldProps: true,
                              getFieldMeta: true,
                              getFieldHelpers: true,
                              validateOnBlur: true,
                              validateOnChange: true,
                              validateOnMount: true,
                            },
                          },
                        ],
                        type: true,
                        key: true,
                        editNode: true,
                        title: true,
                        mold: true,
                        data: {
                          key: true,
                          list: [
                            {
                              deviceType: {
                                label: true,
                                value: true,
                              },
                              status: {
                                label: true,
                                value: true,
                              },
                              deviceList: {
                                label: true,
                                value: true,
                              },
                              operaType: true,
                            },
                            {
                              deviceType: {
                                label: true,
                                value: true,
                              },
                              deviceList: {
                                label: true,
                                value: true,
                              },
                              status: {
                                label: true,
                                value: true,
                              },
                              operaType: true,
                            },
                          ],
                          title: true,
                          canAdd: true,
                          type: true,
                          editNode: true,
                          addNewType: true,
                        },
                        formik: {
                          values: {
                            add: {
                              list: [
                                {
                                  operaType: true,
                                  deviceType: true,
                                  deviceList: true,
                                  status: true,
                                },
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                              ],
                              title: true,
                            },
                            Condition: {
                              list: [
                                {
                                  key: true,
                                  list: [
                                    {
                                      deviceType: {
                                        label: true,
                                        value: true,
                                      },
                                      status: {
                                        label: true,
                                        value: true,
                                      },
                                      deviceList: {
                                        label: true,
                                        value: true,
                                      },
                                      operaType: true,
                                    },
                                    {
                                      deviceType: {
                                        label: true,
                                        value: true,
                                      },
                                      status: {
                                        label: true,
                                        value: true,
                                      },
                                      deviceList: {
                                        label: true,
                                        value: true,
                                      },
                                      operaType: true,
                                    },
                                  ],
                                  title: true,
                                  canAdd: true,
                                  type: true,
                                  editNode: true,
                                  addNewType: true,
                                  formik: {
                                    values: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                          },
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    errors: {},
                                    touched: {
                                      add: {
                                        list: [
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    status: true,
                                    isSubmitting: true,
                                    isValidating: true,
                                    submitCount: true,
                                    initialValues: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    initialErrors: {},
                                    initialTouched: {},
                                    initialStatus: true,
                                    handleBlur: true,
                                    handleChange: true,
                                    handleReset: true,
                                    handleSubmit: true,
                                    resetForm: true,
                                    setErrors: true,
                                    setFormikState: true,
                                    setFieldTouched: true,
                                    setFieldValue: true,
                                    setFieldError: true,
                                    setStatus: true,
                                    setSubmitting: true,
                                    setTouched: true,
                                    setValues: true,
                                    submitForm: true,
                                    validateForm: true,
                                    validateField: true,
                                    isValid: true,
                                    dirty: true,
                                    unregisterField: true,
                                    registerField: true,
                                    getFieldProps: true,
                                    getFieldMeta: true,
                                    getFieldHelpers: true,
                                    validateOnBlur: true,
                                    validateOnChange: true,
                                    validateOnMount: true,
                                  },
                                },
                                {
                                  list: [
                                    {
                                      deviceType: {
                                        label: true,
                                        value: true,
                                      },
                                      status: {
                                        label: true,
                                        value: true,
                                      },
                                      deviceList: {
                                        label: true,
                                        value: true,
                                      },
                                      operaType: true,
                                    },
                                    {
                                      deviceType: {
                                        label: true,
                                        value: true,
                                      },
                                      status: {
                                        label: true,
                                        value: true,
                                      },
                                      deviceList: {
                                        label: true,
                                        value: true,
                                      },
                                      operaType: true,
                                    },
                                  ],
                                  key: true,
                                  title: true,
                                  canAdd: true,
                                  type: true,
                                  addNewType: true,
                                  formik: {
                                    values: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                        title: true,
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                          },
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            operaType: true,
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    errors: {
                                      DeviceStatus: {
                                        title: true,
                                        list: [
                                          {
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                      },
                                    },
                                    touched: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    status: true,
                                    isSubmitting: true,
                                    isValidating: true,
                                    submitCount: true,
                                    initialValues: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    initialErrors: {},
                                    initialTouched: {},
                                    initialStatus: true,
                                    handleBlur: true,
                                    handleChange: true,
                                    handleReset: true,
                                    handleSubmit: true,
                                    resetForm: true,
                                    setErrors: true,
                                    setFormikState: true,
                                    setFieldTouched: true,
                                    setFieldValue: true,
                                    setFieldError: true,
                                    setStatus: true,
                                    setSubmitting: true,
                                    setTouched: true,
                                    setValues: true,
                                    submitForm: true,
                                    validateForm: true,
                                    validateField: true,
                                    isValid: true,
                                    dirty: true,
                                    unregisterField: true,
                                    registerField: true,
                                    getFieldProps: true,
                                    getFieldMeta: true,
                                    getFieldHelpers: true,
                                    validateOnBlur: true,
                                    validateOnChange: true,
                                    validateOnMount: true,
                                  },
                                },
                                {
                                  key: true,
                                  type: true,
                                  editNode: true,
                                  list: [
                                    {
                                      deviceType: {
                                        label: true,
                                        value: true,
                                      },
                                      status: {
                                        label: true,
                                        value: true,
                                      },
                                      deviceList: {
                                        label: true,
                                        value: true,
                                      },
                                      operaType: true,
                                    },
                                    {
                                      deviceType: {
                                        label: true,
                                        value: true,
                                      },
                                      status: {
                                        label: true,
                                        value: true,
                                      },
                                      deviceList: {
                                        label: true,
                                        value: true,
                                      },
                                      operaType: true,
                                    },
                                  ],
                                  title: true,
                                  canAdd: true,
                                  addNewType: true,
                                  formik: {
                                    values: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                          },
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                        ],
                                        key: true,
                                        type: true,
                                        editNode: true,
                                        title: true,
                                        canAdd: true,
                                        addNewType: true,
                                        formik: {
                                          values: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: true,
                                                  deviceType: true,
                                                  deviceList: true,
                                                  status: true,
                                                },
                                              ],
                                              title: true,
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: true,
                                                  deviceType: true,
                                                  deviceList: true,
                                                  status: true,
                                                },
                                              ],
                                            },
                                            Time: {
                                              time: true,
                                              timeType: true,
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: true,
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: true,
                                              list: [
                                                {
                                                  cleaner: true,
                                                  turnaroundTime: true,
                                                  turnaroundTimeType: true,
                                                  reminder: true,
                                                  reminderType: true,
                                                },
                                              ],
                                            },
                                          },
                                          errors: {},
                                          touched: {},
                                          status: true,
                                          isSubmitting: true,
                                          isValidating: true,
                                          submitCount: true,
                                          initialValues: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: true,
                                                  deviceType: true,
                                                  deviceList: true,
                                                  status: true,
                                                },
                                              ],
                                              title: true,
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: true,
                                                  deviceType: true,
                                                  deviceList: true,
                                                  status: true,
                                                },
                                              ],
                                            },
                                            Time: {
                                              time: true,
                                              timeType: true,
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: true,
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: true,
                                              list: [
                                                {
                                                  cleaner: true,
                                                  turnaroundTime: true,
                                                  turnaroundTimeType: true,
                                                  reminder: true,
                                                  reminderType: true,
                                                },
                                              ],
                                            },
                                          },
                                          initialErrors: {},
                                          initialTouched: {},
                                          initialStatus: true,
                                          handleBlur: true,
                                          handleChange: true,
                                          handleReset: true,
                                          handleSubmit: true,
                                          resetForm: true,
                                          setErrors: true,
                                          setFormikState: true,
                                          setFieldTouched: true,
                                          setFieldValue: true,
                                          setFieldError: true,
                                          setStatus: true,
                                          setSubmitting: true,
                                          setTouched: true,
                                          setValues: true,
                                          submitForm: true,
                                          validateForm: true,
                                          validateField: true,
                                          isValid: true,
                                          dirty: true,
                                          unregisterField: true,
                                          registerField: true,
                                          getFieldProps: true,
                                          getFieldMeta: true,
                                          getFieldHelpers: true,
                                          validateOnBlur: true,
                                          validateOnChange: true,
                                          validateOnMount: true,
                                        },
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    errors: {},
                                    touched: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    status: true,
                                    isSubmitting: true,
                                    isValidating: true,
                                    submitCount: true,
                                    initialValues: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    initialErrors: {},
                                    initialTouched: {},
                                    initialStatus: true,
                                    handleBlur: true,
                                    handleChange: true,
                                    handleReset: true,
                                    handleSubmit: true,
                                    resetForm: true,
                                    setErrors: true,
                                    setFormikState: true,
                                    setFieldTouched: true,
                                    setFieldValue: true,
                                    setFieldError: true,
                                    setStatus: true,
                                    setSubmitting: true,
                                    setTouched: true,
                                    setValues: true,
                                    submitForm: true,
                                    validateForm: true,
                                    validateField: true,
                                    isValid: true,
                                    dirty: true,
                                    unregisterField: true,
                                    registerField: true,
                                    getFieldProps: true,
                                    getFieldMeta: true,
                                    getFieldHelpers: true,
                                    validateOnBlur: true,
                                    validateOnChange: true,
                                    validateOnMount: true,
                                  },
                                },
                              ],
                            },
                            DeviceStatus: {
                              list: [
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                              ],
                              title: true,
                            },
                            Time: {
                              time: true,
                              timeType: true,
                            },
                            Robot: {
                              list: [
                                {
                                  operaType: true,
                                },
                              ],
                            },
                            Cleaner: {
                              title: true,
                              list: [
                                {
                                  cleaner: true,
                                  turnaroundTime: true,
                                  turnaroundTimeType: true,
                                  reminder: true,
                                  reminderType: true,
                                },
                              ],
                            },
                          },
                          errors: {},
                          touched: {
                            add: {
                              list: [
                                {
                                  operaType: true,
                                  deviceType: true,
                                  deviceList: true,
                                  status: true,
                                },
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                              ],
                              title: true,
                            },
                            Condition: {
                              list: [],
                            },
                            DeviceStatus: {
                              list: [
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                              ],
                              title: true,
                            },
                            Time: {
                              time: true,
                              timeType: true,
                            },
                            Robot: {
                              list: [
                                {
                                  operaType: true,
                                },
                              ],
                            },
                            Cleaner: {
                              title: true,
                              list: [
                                {
                                  cleaner: true,
                                  turnaroundTime: true,
                                  turnaroundTimeType: true,
                                  reminder: true,
                                  reminderType: true,
                                },
                              ],
                            },
                          },
                          status: true,
                          isSubmitting: true,
                          isValidating: true,
                          submitCount: true,
                          initialValues: {
                            add: {
                              list: [
                                {
                                  operaType: true,
                                  deviceType: true,
                                  deviceList: true,
                                  status: true,
                                },
                              ],
                              title: true,
                            },
                            Condition: {
                              list: [],
                            },
                            DeviceStatus: {
                              list: [
                                {
                                  operaType: true,
                                  deviceType: true,
                                  deviceList: true,
                                  status: true,
                                },
                              ],
                            },
                            Time: {
                              time: true,
                              timeType: true,
                            },
                            Robot: {
                              list: [
                                {
                                  operaType: true,
                                },
                              ],
                            },
                            Cleaner: {
                              title: true,
                              list: [
                                {
                                  cleaner: true,
                                  turnaroundTime: true,
                                  turnaroundTimeType: true,
                                  reminder: true,
                                  reminderType: true,
                                },
                              ],
                            },
                          },
                          initialErrors: {},
                          initialTouched: {},
                          initialStatus: true,
                          handleBlur: true,
                          handleChange: true,
                          handleReset: true,
                          handleSubmit: true,
                          resetForm: true,
                          setErrors: true,
                          setFormikState: true,
                          setFieldTouched: true,
                          setFieldValue: true,
                          setFieldError: true,
                          setStatus: true,
                          setSubmitting: true,
                          setTouched: true,
                          setValues: true,
                          submitForm: true,
                          validateForm: true,
                          validateField: true,
                          isValid: true,
                          dirty: true,
                          unregisterField: true,
                          registerField: true,
                          getFieldProps: true,
                          getFieldMeta: true,
                          getFieldHelpers: true,
                          validateOnBlur: true,
                          validateOnChange: true,
                          validateOnMount: true,
                        },
                      },
                      DeviceStatus: {
                        list: [
                          {
                            deviceType: {
                              label: true,
                              value: true,
                            },
                            status: {
                              label: true,
                              value: true,
                            },
                            deviceList: {
                              label: true,
                              value: true,
                            },
                            operaType: true,
                          },
                          {
                            deviceType: {
                              label: true,
                              value: true,
                            },
                            deviceList: {
                              label: true,
                              value: true,
                            },
                            status: {
                              label: true,
                              value: true,
                            },
                            operaType: true,
                          },
                          {
                            deviceType: {
                              label: true,
                              value: true,
                            },
                            deviceList: {
                              label: true,
                              value: true,
                            },
                            status: {
                              label: true,
                              value: true,
                            },
                            operaType: true,
                          },
                        ],
                        title: true,
                      },
                      Time: {
                        time: true,
                        timeType: true,
                      },
                      Robot: {
                        list: [
                          {
                            operaType: true,
                          },
                        ],
                      },
                      Cleaner: {
                        title: true,
                        list: [
                          {
                            cleaner: true,
                            turnaroundTime: true,
                            turnaroundTimeType: true,
                            reminder: true,
                            reminderType: true,
                          },
                        ],
                      },
                    },
                    isSubmitting: true,
                    isValidating: false,
                    submitCount: 1,
                    initialValues: {
                      add: {
                        list: [
                          {
                            operaType: 'AND',
                            deviceType: null,
                            deviceList: null,
                            status: null,
                          },
                        ],
                        title: '',
                      },
                      Condition: {
                        list: [],
                      },
                      DeviceStatus: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                      Time: {
                        time: '',
                      },
                      Robot: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                      Cleaner: {
                        title: '',
                        list: [{}],
                      },
                    },
                    initialErrors: {},
                    initialTouched: {},
                    isValid: true,
                    dirty: true,
                    validateOnBlur: true,
                    validateOnChange: true,
                    validateOnMount: false,
                  },
                },
              ],
              key: '3-0-0',
              title: '阿斯蒂芬',
              canAdd: '22',
              type: 'Condition',
            },
            children: [
              {
                id: '3-0-0-0',
                type: 'custom-condiction-children',
                data: {
                  key: '3-0-0-0',
                  title: '',
                  canAdd: 'add',
                  type: 'High',
                },
                children: [],
                title: '',
                canAdd: 'add',
              },
              {
                id: '3-0-0-1',
                type: 'custom-condiction-children',
                data: {
                  key: '3-0-0-1',
                  title: '',
                  canAdd: 'add',
                  type: 'High',
                },
                children: [],
                title: '',
                canAdd: 'add',
              },
              {
                id: '3-0-0-2',
                type: 'custom-condiction-children',
                data: {
                  key: '3-0-0-2',
                  title: '',
                  canAdd: 'add',
                  type: 'High',
                },
                children: [],
                title: '',
                canAdd: 'add',
              },
            ],
            title: '阿斯蒂芬',
            canAdd: '22',
          },
        ],
        title: '',
        canAdd: '',
      },
      {
        id: '3-1',
        type: 'custom-condiction-children',
        data: {
          key: '3-1',
          title: '',
          canAdd: '',
          type: 'Medium',
        },
        children: [
          {
            id: '3-1-0',
            type: 'custom-robot',
            data: {
              list: [
                {
                  operaType: 'AND',
                  type: {
                    label: 'Cleaning',
                    value: 9,
                  },
                  list: {
                    label: 'BA-92',
                    value: 3,
                  },
                },
                {
                  operaType: 'OR',
                  type: {
                    label: 'Cleaning',
                    value: 9,
                  },
                  list: {
                    label: 'BA-92',
                    value: 3,
                  },
                },
              ],
              key: '3-1-0',
              title: '阿斯蒂芬',
              canAdd: '',
              type: 'Robot',
            },
            children: [],
            title: '阿斯蒂芬',
            canAdd: '',
          },
          {
            id: '3-1-1',
            type: 'custom-cleaner',
            data: {
              list: [
                {
                  operaType: 'AND',
                  cleaner: {
                    label: '111',
                    value: 2,
                  },
                  turnaroundTime: '12',
                  turnaroundTimeType: {
                    label: 'Minutes',
                    value: 1,
                  },
                  reminder: '121',
                  reminderType: {
                    label: 'Minutes',
                    value: 1,
                  },
                },
              ],
              key: '3-1-1',
              title: '22',
              canAdd: '',
              type: 'Cleaner',
            },
            children: [],
            title: '22',
            canAdd: '',
          },
          {
            id: '3-1-2',
            type: 'custom-condiction',
            data: {
              list: [
                {
                  key: '1',
                  list: [
                    {
                      deviceType: {
                        label: 'Motion',
                        value: 13,
                      },
                      status: {
                        label: 'Medium',
                        value: 2,
                      },
                      deviceList: {
                        label: 'BA-97',
                        value: 8,
                      },
                      operaType: 'AND',
                    },
                    {
                      deviceType: {
                        label: 'Paper Towel Dispenser',
                        value: 3,
                      },
                      status: {
                        label: 'Medium',
                        value: 2,
                      },
                      deviceList: {
                        label: 'BA-95',
                        value: 6,
                      },
                      operaType: 'OR',
                    },
                  ],
                  title: '11',
                  canAdd: '',
                  type: 'add',
                  formik: {
                    values: {
                      add: {
                        list: [
                          {
                            operaType: 'AND',
                            deviceType: {
                              label: 'Motion',
                              value: 13,
                            },
                            deviceList: {
                              label: 'BA-97',
                              value: 8,
                            },
                            status: {
                              label: 'Medium',
                              value: 2,
                            },
                          },
                          {
                            deviceType: {
                              label: 'Paper Towel Dispenser',
                              value: 3,
                            },
                            deviceList: {
                              label: 'BA-95',
                              value: 6,
                            },
                            status: {
                              label: 'Medium',
                              value: 2,
                            },
                            operaType: 'OR',
                          },
                        ],
                        title: '11',
                      },
                      Condition: {
                        list: [],
                      },
                      DeviceStatus: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                      Time: {
                        time: '',
                      },
                      Robot: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                      Cleaner: {
                        title: '',
                        list: [{}],
                      },
                    },
                    errors: {},
                    touched: {
                      add: {
                        list: [
                          {
                            deviceType: {
                              label: true,
                              value: true,
                            },
                            status: {
                              label: true,
                              value: true,
                            },
                            deviceList: {
                              label: true,
                              value: true,
                            },
                            operaType: true,
                          },
                          {
                            deviceType: {
                              label: true,
                              value: true,
                            },
                            deviceList: {
                              label: true,
                              value: true,
                            },
                            status: {
                              label: true,
                              value: true,
                            },
                            operaType: true,
                          },
                        ],
                        title: true,
                      },
                      Condition: {
                        list: [],
                      },
                      DeviceStatus: {
                        list: [
                          {
                            operaType: true,
                            deviceType: true,
                            deviceList: true,
                            status: true,
                          },
                        ],
                      },
                      Time: {
                        time: true,
                        timeType: true,
                      },
                      Robot: {
                        list: [
                          {
                            operaType: true,
                          },
                        ],
                      },
                      Cleaner: {
                        title: true,
                        list: [
                          {
                            cleaner: true,
                            turnaroundTime: true,
                            turnaroundTimeType: true,
                            reminder: true,
                            reminderType: true,
                          },
                        ],
                      },
                    },
                    isSubmitting: true,
                    isValidating: false,
                    submitCount: 1,
                    initialValues: {
                      add: {
                        list: [
                          {
                            operaType: 'AND',
                            deviceType: null,
                            deviceList: null,
                            status: null,
                          },
                        ],
                        title: '',
                      },
                      Condition: {
                        list: [],
                      },
                      DeviceStatus: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                      Time: {
                        time: '',
                      },
                      Robot: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                      Cleaner: {
                        title: '',
                        list: [{}],
                      },
                    },
                    initialErrors: {},
                    initialTouched: {},
                    isValid: true,
                    dirty: true,
                    validateOnBlur: true,
                    validateOnChange: true,
                    validateOnMount: false,
                  },
                },
                {
                  list: [
                    {
                      deviceType: {
                        label: 'Motion',
                        value: 13,
                      },
                      status: {
                        label: 'High',
                        value: 1,
                      },
                      deviceList: {
                        label: 'BA-96',
                        value: 7,
                      },
                      operaType: 'AND',
                    },
                    {
                      deviceType: {
                        label: 'People Counting',
                        value: 2,
                      },
                      status: {
                        label: 'High',
                        value: 1,
                      },
                      deviceList: {
                        label: 'BA-97',
                        value: 8,
                      },
                      operaType: 'AND',
                    },
                    {
                      deviceType: {
                        label: 'Light',
                        value: 12,
                      },
                      status: {
                        label: 'High',
                        value: 1,
                      },
                      deviceList: {
                        label: 'BA-95',
                        value: 6,
                      },
                      operaType: 'OR',
                    },
                  ],
                  key: '1',
                  title: '22',
                  canAdd: null,
                  type: 'DeviceStatus',
                  formik: {
                    values: {
                      add: {
                        list: [
                          {
                            operaType: 'AND',
                            deviceType: null,
                            deviceList: null,
                            status: null,
                          },
                        ],
                        title: '',
                      },
                      Condition: {
                        list: [],
                        title: '',
                      },
                      DeviceStatus: {
                        list: [
                          {
                            operaType: 'AND',
                            deviceType: {
                              label: 'Motion',
                              value: 13,
                            },
                            deviceList: {
                              label: 'BA-96',
                              value: 7,
                            },
                            status: {
                              label: 'High',
                              value: 1,
                            },
                          },
                          {
                            deviceType: {
                              label: 'People Counting',
                              value: 2,
                            },
                            deviceList: {
                              label: 'BA-97',
                              value: 8,
                            },
                            status: {
                              label: 'High',
                              value: 1,
                            },
                            operaType: 'AND',
                          },
                          {
                            deviceType: {
                              label: 'Light',
                              value: 12,
                            },
                            deviceList: {
                              label: 'BA-95',
                              value: 6,
                            },
                            status: {
                              label: 'High',
                              value: 1,
                            },
                            operaType: 'OR',
                          },
                        ],
                        title: '22',
                      },
                      Time: {
                        time: '',
                        timeType: '',
                      },
                      Robot: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                        title: '',
                      },
                      Cleaner: {
                        title: '',
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                    },
                    errors: {
                      DeviceStatus: {
                        title: 'Required title',
                        list: [
                          {
                            deviceType: 'Required device type',
                            deviceList: 'Required device list',
                            status: 'Required status',
                          },
                        ],
                      },
                    },
                    touched: {
                      add: {
                        list: [
                          {
                            operaType: true,
                            deviceType: true,
                            deviceList: true,
                            status: true,
                          },
                        ],
                        title: true,
                      },
                      Condition: {
                        list: [],
                      },
                      DeviceStatus: {
                        list: [
                          {
                            deviceType: {
                              label: true,
                              value: true,
                            },
                            status: {
                              label: true,
                              value: true,
                            },
                            deviceList: {
                              label: true,
                              value: true,
                            },
                            operaType: true,
                          },
                          {
                            deviceType: {
                              label: true,
                              value: true,
                            },
                            deviceList: {
                              label: true,
                              value: true,
                            },
                            status: {
                              label: true,
                              value: true,
                            },
                            operaType: true,
                          },
                          {
                            deviceType: {
                              label: true,
                              value: true,
                            },
                            deviceList: {
                              label: true,
                              value: true,
                            },
                            status: {
                              label: true,
                              value: true,
                            },
                            operaType: true,
                          },
                        ],
                        title: true,
                      },
                      Time: {
                        time: true,
                        timeType: true,
                      },
                      Robot: {
                        list: [
                          {
                            operaType: true,
                          },
                        ],
                      },
                      Cleaner: {
                        title: true,
                        list: [
                          {
                            cleaner: true,
                            turnaroundTime: true,
                            turnaroundTimeType: true,
                            reminder: true,
                            reminderType: true,
                          },
                        ],
                      },
                    },
                    isSubmitting: true,
                    isValidating: false,
                    submitCount: 1,
                    initialValues: {
                      add: {
                        list: [
                          {
                            operaType: 'AND',
                            deviceType: null,
                            deviceList: null,
                            status: null,
                          },
                        ],
                        title: '',
                      },
                      Condition: {
                        list: [],
                      },
                      DeviceStatus: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                      Time: {
                        time: '',
                      },
                      Robot: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                      Cleaner: {
                        title: '',
                        list: [{}],
                      },
                    },
                    initialErrors: {},
                    initialTouched: {},
                    isValid: true,
                    dirty: true,
                    validateOnBlur: true,
                    validateOnChange: true,
                    validateOnMount: false,
                  },
                },
                {
                  key: '2',
                  type: 'DeviceStatus',
                  list: [
                    {
                      deviceType: {
                        label: 'Humidity',
                        value: 14,
                      },
                      status: {
                        label: 'Normal',
                        value: 3,
                      },
                      deviceList: {
                        label: 'BA-94',
                        value: 5,
                      },
                      operaType: 'AND',
                    },
                    {
                      deviceType: {
                        label: 'Ammonia Sensor',
                        value: 2,
                      },
                      status: {
                        label: 'High',
                        value: 1,
                      },
                      deviceList: {
                        label: 'BA-96',
                        value: 7,
                      },
                      operaType: 'AND',
                    },
                    {
                      deviceType: {
                        label: 'People Counting',
                        value: 2,
                      },
                      status: {
                        label: 'High',
                        value: 1,
                      },
                      deviceList: {
                        label: 'BA-96',
                        value: 7,
                      },
                      operaType: 'AND',
                    },
                  ],
                  title: '22333',
                  canAdd: null,
                  formik: {
                    values: {
                      add: {
                        list: [
                          {
                            operaType: 'AND',
                            deviceType: null,
                            deviceList: null,
                            status: null,
                          },
                        ],
                        title: '',
                      },
                      Condition: {
                        list: [
                          {
                            key: '1',
                            list: [
                              {
                                deviceType: {
                                  label: 'Motion',
                                  value: 13,
                                },
                                status: {
                                  label: 'Medium',
                                  value: 2,
                                },
                                deviceList: {
                                  label: 'BA-97',
                                  value: 8,
                                },
                                operaType: 'AND',
                              },
                              {
                                deviceType: {
                                  label: 'Paper Towel Dispenser',
                                  value: 3,
                                },
                                deviceList: {
                                  label: 'BA-95',
                                  value: 6,
                                },
                                status: {
                                  label: 'Medium',
                                  value: 2,
                                },
                                operaType: 'OR',
                              },
                            ],
                            title: '11',
                            canAdd: '',
                            type: 'add',
                          },
                          {
                            list: [
                              {
                                deviceType: {
                                  label: 'Motion',
                                  value: 13,
                                },
                                status: {
                                  label: 'High',
                                  value: 1,
                                },
                                deviceList: {
                                  label: 'BA-96',
                                  value: 7,
                                },
                                operaType: 'AND',
                              },
                              {
                                deviceType: {
                                  label: 'People Counting',
                                  value: 2,
                                },
                                deviceList: {
                                  label: 'BA-97',
                                  value: 8,
                                },
                                status: {
                                  label: 'High',
                                  value: 1,
                                },
                                operaType: 'AND',
                              },
                            ],
                            key: '1',
                            title: '22',
                            canAdd: null,
                            type: 'DeviceStatus',
                            formik: {
                              values: {
                                add: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                      deviceType: null,
                                      deviceList: null,
                                      status: null,
                                    },
                                  ],
                                  title: '',
                                },
                                Condition: {
                                  list: [],
                                  title: '',
                                },
                                DeviceStatus: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                    },
                                  ],
                                  title: '',
                                },
                                Time: {
                                  time: '',
                                  timeType: '',
                                },
                                Robot: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                    },
                                  ],
                                  title: '',
                                },
                                Cleaner: {
                                  title: '',
                                  list: [
                                    {
                                      operaType: 'AND',
                                    },
                                  ],
                                },
                              },
                              errors: {
                                DeviceStatus: {
                                  title: 'Required title',
                                  list: [
                                    {
                                      deviceType: 'Required device type',
                                      deviceList: 'Required device list',
                                      status: 'Required status',
                                    },
                                  ],
                                },
                              },
                              touched: {},
                              isSubmitting: false,
                              isValidating: false,
                              submitCount: 0,
                              initialValues: {
                                add: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                      deviceType: null,
                                      deviceList: null,
                                      status: null,
                                    },
                                  ],
                                  title: '',
                                },
                                Condition: {
                                  list: [],
                                },
                                DeviceStatus: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                    },
                                  ],
                                },
                                Time: {
                                  time: '',
                                },
                                Robot: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                    },
                                  ],
                                },
                                Cleaner: {
                                  title: '',
                                  list: [{}],
                                },
                              },
                              initialErrors: {},
                              initialTouched: {},
                              isValid: false,
                              dirty: true,
                              validateOnBlur: true,
                              validateOnChange: true,
                              validateOnMount: false,
                            },
                          },
                          {
                            key: '2',
                            type: 'DeviceStatus',
                            list: [
                              {
                                deviceType: {
                                  label: 'Humidity',
                                  value: 14,
                                },
                                status: {
                                  label: 'Normal',
                                  value: 3,
                                },
                                deviceList: {
                                  label: 'BA-94',
                                  value: 5,
                                },
                                operaType: 'AND',
                              },
                              {
                                deviceType: {
                                  label: 'Ammonia Sensor',
                                  value: 2,
                                },
                                deviceList: {
                                  label: 'BA-96',
                                  value: 7,
                                },
                                status: {
                                  label: 'High',
                                  value: 1,
                                },
                                operaType: 'AND',
                              },
                            ],
                            title: '22333',
                            canAdd: null,
                            formik: {
                              values: {
                                add: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                      deviceType: null,
                                      deviceList: null,
                                      status: null,
                                    },
                                  ],
                                  title: '',
                                },
                                Condition: {
                                  list: [],
                                },
                                DeviceStatus: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                    },
                                  ],
                                },
                                Time: {
                                  time: '',
                                },
                                Robot: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                    },
                                  ],
                                },
                                Cleaner: {
                                  title: '',
                                  list: [{}],
                                },
                              },
                              errors: {},
                              touched: {},
                              isSubmitting: false,
                              isValidating: false,
                              submitCount: 0,
                              initialValues: {
                                add: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                      deviceType: null,
                                      deviceList: null,
                                      status: null,
                                    },
                                  ],
                                  title: '',
                                },
                                Condition: {
                                  list: [],
                                },
                                DeviceStatus: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                    },
                                  ],
                                },
                                Time: {
                                  time: '',
                                },
                                Robot: {
                                  list: [
                                    {
                                      operaType: 'AND',
                                    },
                                  ],
                                },
                                Cleaner: {
                                  title: '',
                                  list: [{}],
                                },
                              },
                              initialErrors: {},
                              initialTouched: {},
                              isValid: true,
                              dirty: false,
                              validateOnBlur: true,
                              validateOnChange: true,
                              validateOnMount: false,
                            },
                          },
                        ],
                        type: 'Condition',
                        key: '3',
                        title: '78',
                        mold: '11',
                        data: {
                          key: '1',
                          list: [
                            {
                              deviceType: {
                                label: 'Motion',
                                value: 13,
                              },
                              status: {
                                label: 'Medium',
                                value: 2,
                              },
                              deviceList: {
                                label: 'BA-97',
                                value: 8,
                              },
                              operaType: 'AND',
                            },
                            {
                              deviceType: {
                                label: 'Paper Towel Dispenser',
                                value: 3,
                              },
                              deviceList: {
                                label: 'BA-95',
                                value: 6,
                              },
                              status: {
                                label: 'Medium',
                                value: 2,
                              },
                              operaType: 'OR',
                            },
                          ],
                          title: '11',
                          canAdd: '',
                          type: 'add',
                        },
                        formik: {
                          values: {
                            add: {
                              list: [
                                {
                                  operaType: 'AND',
                                  deviceType: null,
                                  deviceList: null,
                                  status: null,
                                },
                                {
                                  deviceType: {
                                    label: 'Paper Towel Dispenser',
                                    value: 3,
                                  },
                                  deviceList: {
                                    label: 'BA-95',
                                    value: 6,
                                  },
                                  status: {
                                    label: 'Medium',
                                    value: 2,
                                  },
                                  operaType: 'OR',
                                },
                              ],
                              title: '',
                            },
                            Condition: {
                              list: [
                                {
                                  key: '1',
                                  list: [
                                    {
                                      deviceType: {
                                        label: 'Motion',
                                        value: 13,
                                      },
                                      status: {
                                        label: 'Medium',
                                        value: 2,
                                      },
                                      deviceList: {
                                        label: 'BA-97',
                                        value: 8,
                                      },
                                      operaType: 'AND',
                                    },
                                    {
                                      deviceType: {
                                        label: 'Paper Towel Dispenser',
                                        value: 3,
                                      },
                                      status: {
                                        label: 'Medium',
                                        value: 2,
                                      },
                                      deviceList: {
                                        label: 'BA-95',
                                        value: 6,
                                      },
                                      operaType: 'OR',
                                    },
                                  ],
                                  title: '11',
                                  canAdd: '',
                                  type: 'add',
                                  formik: {
                                    values: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: {
                                              label: 'Motion',
                                              value: 13,
                                            },
                                            deviceList: {
                                              label: 'BA-97',
                                              value: 8,
                                            },
                                            status: {
                                              label: 'Medium',
                                              value: 2,
                                            },
                                          },
                                          {
                                            deviceType: {
                                              label: 'Paper Towel Dispenser',
                                              value: 3,
                                            },
                                            deviceList: {
                                              label: 'BA-95',
                                              value: 6,
                                            },
                                            status: {
                                              label: 'Medium',
                                              value: 2,
                                            },
                                            operaType: 'OR',
                                          },
                                        ],
                                        title: '11',
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [{}],
                                      },
                                    },
                                    errors: {},
                                    touched: {
                                      add: {
                                        list: [
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    isSubmitting: true,
                                    isValidating: false,
                                    submitCount: 1,
                                    initialValues: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: null,
                                            deviceList: null,
                                            status: null,
                                          },
                                        ],
                                        title: '',
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [{}],
                                      },
                                    },
                                    initialErrors: {},
                                    initialTouched: {},
                                    isValid: true,
                                    dirty: true,
                                    validateOnBlur: true,
                                    validateOnChange: true,
                                    validateOnMount: false,
                                  },
                                },
                                {
                                  list: [
                                    {
                                      deviceType: {
                                        label: 'Motion',
                                        value: 13,
                                      },
                                      status: {
                                        label: 'High',
                                        value: 1,
                                      },
                                      deviceList: {
                                        label: 'BA-96',
                                        value: 7,
                                      },
                                      operaType: 'AND',
                                    },
                                    {
                                      deviceType: {
                                        label: 'People Counting',
                                        value: 2,
                                      },
                                      status: {
                                        label: 'High',
                                        value: 1,
                                      },
                                      deviceList: {
                                        label: 'BA-97',
                                        value: 8,
                                      },
                                      operaType: 'AND',
                                    },
                                  ],
                                  key: '1',
                                  title: '22',
                                  canAdd: null,
                                  type: 'DeviceStatus',
                                  formik: {
                                    values: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: null,
                                            deviceList: null,
                                            status: null,
                                          },
                                        ],
                                        title: '',
                                      },
                                      Condition: {
                                        list: [],
                                        title: '',
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: {
                                              label: 'Motion',
                                              value: 13,
                                            },
                                            deviceList: {
                                              label: 'BA-96',
                                              value: 7,
                                            },
                                            status: {
                                              label: 'High',
                                              value: 1,
                                            },
                                          },
                                          {
                                            deviceType: {
                                              label: 'People Counting',
                                              value: 2,
                                            },
                                            deviceList: {
                                              label: 'BA-97',
                                              value: 8,
                                            },
                                            status: {
                                              label: 'High',
                                              value: 1,
                                            },
                                            operaType: 'AND',
                                          },
                                        ],
                                        title: '22',
                                      },
                                      Time: {
                                        time: '',
                                        timeType: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                        title: '',
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                    },
                                    errors: {
                                      DeviceStatus: {
                                        title: 'Required title',
                                        list: [
                                          {
                                            deviceType: 'Required device type',
                                            deviceList: 'Required device list',
                                            status: 'Required status',
                                          },
                                        ],
                                      },
                                    },
                                    touched: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    isSubmitting: true,
                                    isValidating: false,
                                    submitCount: 1,
                                    initialValues: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: null,
                                            deviceList: null,
                                            status: null,
                                          },
                                        ],
                                        title: '',
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [{}],
                                      },
                                    },
                                    initialErrors: {},
                                    initialTouched: {},
                                    isValid: true,
                                    dirty: true,
                                    validateOnBlur: true,
                                    validateOnChange: true,
                                    validateOnMount: false,
                                  },
                                },
                                {
                                  key: '2',
                                  type: 'DeviceStatus',
                                  list: [
                                    {
                                      deviceType: {
                                        label: 'Humidity',
                                        value: 14,
                                      },
                                      status: {
                                        label: 'Normal',
                                        value: 3,
                                      },
                                      deviceList: {
                                        label: 'BA-94',
                                        value: 5,
                                      },
                                      operaType: 'AND',
                                    },
                                    {
                                      deviceType: {
                                        label: 'Ammonia Sensor',
                                        value: 2,
                                      },
                                      status: {
                                        label: 'High',
                                        value: 1,
                                      },
                                      deviceList: {
                                        label: 'BA-96',
                                        value: 7,
                                      },
                                      operaType: 'AND',
                                    },
                                  ],
                                  title: '22333',
                                  canAdd: null,
                                  formik: {
                                    values: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: null,
                                            deviceList: null,
                                            status: null,
                                          },
                                        ],
                                        title: '',
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: {
                                              label: 'Humidity',
                                              value: 14,
                                            },
                                            deviceList: {
                                              label: 'BA-94',
                                              value: 5,
                                            },
                                            status: {
                                              label: 'Normal',
                                              value: 3,
                                            },
                                          },
                                          {
                                            deviceType: {
                                              label: 'Ammonia Sensor',
                                              value: 2,
                                            },
                                            deviceList: {
                                              label: 'BA-96',
                                              value: 7,
                                            },
                                            status: {
                                              label: 'High',
                                              value: 1,
                                            },
                                            operaType: 'AND',
                                          },
                                        ],
                                        key: '2',
                                        type: 'DeviceStatus',
                                        title: '22333',
                                        canAdd: null,
                                        formik: {
                                          values: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: null,
                                                  deviceList: null,
                                                  status: null,
                                                },
                                              ],
                                              title: '',
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Time: {
                                              time: '',
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: '',
                                              list: [{}],
                                            },
                                          },
                                          errors: {},
                                          touched: {},
                                          isSubmitting: false,
                                          isValidating: false,
                                          submitCount: 0,
                                          initialValues: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: null,
                                                  deviceList: null,
                                                  status: null,
                                                },
                                              ],
                                              title: '',
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Time: {
                                              time: '',
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: '',
                                              list: [{}],
                                            },
                                          },
                                          initialErrors: {},
                                          initialTouched: {},
                                          isValid: true,
                                          dirty: false,
                                          validateOnBlur: true,
                                          validateOnChange: true,
                                          validateOnMount: false,
                                        },
                                      },
                                      Time: {
                                        time: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [{}],
                                      },
                                    },
                                    errors: {},
                                    touched: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    isSubmitting: true,
                                    isValidating: false,
                                    submitCount: 1,
                                    initialValues: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: null,
                                            deviceList: null,
                                            status: null,
                                          },
                                        ],
                                        title: '',
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [{}],
                                      },
                                    },
                                    initialErrors: {},
                                    initialTouched: {},
                                    isValid: true,
                                    dirty: true,
                                    validateOnBlur: true,
                                    validateOnChange: true,
                                    validateOnMount: false,
                                  },
                                },
                              ],
                            },
                            DeviceStatus: {
                              list: [
                                {
                                  deviceType: {
                                    label: 'Motion',
                                    value: 13,
                                  },
                                  status: {
                                    label: 'High',
                                    value: 1,
                                  },
                                  deviceList: {
                                    label: 'BA-96',
                                    value: 7,
                                  },
                                  operaType: 'AND',
                                },
                                {
                                  deviceType: {
                                    label: 'People Counting',
                                    value: 2,
                                  },
                                  deviceList: {
                                    label: 'BA-97',
                                    value: 8,
                                  },
                                  status: {
                                    label: 'High',
                                    value: 1,
                                  },
                                  operaType: 'AND',
                                },
                              ],
                              title: '22',
                            },
                            Time: {
                              time: '',
                            },
                            Robot: {
                              list: [
                                {
                                  operaType: 'AND',
                                },
                              ],
                            },
                            Cleaner: {
                              title: '',
                              list: [{}],
                            },
                          },
                          errors: {},
                          touched: {
                            add: {
                              list: [
                                {
                                  operaType: true,
                                  deviceType: true,
                                  deviceList: true,
                                  status: true,
                                },
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                              ],
                              title: true,
                            },
                            Condition: {
                              list: [],
                            },
                            DeviceStatus: {
                              list: [
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                              ],
                              title: true,
                            },
                            Time: {
                              time: true,
                              timeType: true,
                            },
                            Robot: {
                              list: [
                                {
                                  operaType: true,
                                },
                              ],
                            },
                            Cleaner: {
                              title: true,
                              list: [
                                {
                                  cleaner: true,
                                  turnaroundTime: true,
                                  turnaroundTimeType: true,
                                  reminder: true,
                                  reminderType: true,
                                },
                              ],
                            },
                          },
                          isSubmitting: false,
                          isValidating: true,
                          submitCount: 0,
                          initialValues: {
                            add: {
                              list: [
                                {
                                  operaType: 'AND',
                                  deviceType: null,
                                  deviceList: null,
                                  status: null,
                                },
                              ],
                              title: '',
                            },
                            Condition: {
                              list: [],
                            },
                            DeviceStatus: {
                              list: [
                                {
                                  operaType: 'AND',
                                },
                              ],
                            },
                            Time: {
                              time: '',
                            },
                            Robot: {
                              list: [
                                {
                                  operaType: 'AND',
                                },
                              ],
                            },
                            Cleaner: {
                              title: '',
                              list: [{}],
                            },
                          },
                          initialErrors: {},
                          initialTouched: {},
                          isValid: true,
                          dirty: true,
                          validateOnBlur: true,
                          validateOnChange: true,
                          validateOnMount: false,
                        },
                      },
                      DeviceStatus: {
                        list: [
                          {
                            operaType: 'AND',
                            deviceType: {
                              label: 'Humidity',
                              value: 14,
                            },
                            deviceList: {
                              label: 'BA-94',
                              value: 5,
                            },
                            status: {
                              label: 'Normal',
                              value: 3,
                            },
                          },
                          {
                            deviceType: {
                              label: 'Ammonia Sensor',
                              value: 2,
                            },
                            deviceList: {
                              label: 'BA-96',
                              value: 7,
                            },
                            status: {
                              label: 'High',
                              value: 1,
                            },
                            operaType: 'AND',
                          },
                          {
                            deviceType: {
                              label: 'People Counting',
                              value: 2,
                            },
                            deviceList: {
                              label: 'BA-96',
                              value: 7,
                            },
                            status: {
                              label: 'High',
                              value: 1,
                            },
                            operaType: 'AND',
                          },
                        ],
                        key: '2',
                        type: 'DeviceStatus',
                        title: '22333',
                        canAdd: null,
                        formik: {
                          values: {
                            add: {
                              list: [
                                {
                                  operaType: 'AND',
                                  deviceType: null,
                                  deviceList: null,
                                  status: null,
                                },
                              ],
                              title: '',
                            },
                            Condition: {
                              list: [
                                {
                                  key: '1',
                                  list: [
                                    {
                                      deviceType: {
                                        label: 'Motion',
                                        value: 13,
                                      },
                                      status: {
                                        label: 'Medium',
                                        value: 2,
                                      },
                                      deviceList: {
                                        label: 'BA-97',
                                        value: 8,
                                      },
                                      operaType: 'AND',
                                    },
                                    {
                                      deviceType: {
                                        label: 'Paper Towel Dispenser',
                                        value: 3,
                                      },
                                      deviceList: {
                                        label: 'BA-95',
                                        value: 6,
                                      },
                                      status: {
                                        label: 'Medium',
                                        value: 2,
                                      },
                                      operaType: 'OR',
                                    },
                                  ],
                                  title: '11',
                                  canAdd: '',
                                  type: 'add',
                                },
                                {
                                  list: [
                                    {
                                      deviceType: {
                                        label: 'Motion',
                                        value: 13,
                                      },
                                      status: {
                                        label: 'High',
                                        value: 1,
                                      },
                                      deviceList: {
                                        label: 'BA-96',
                                        value: 7,
                                      },
                                      operaType: 'AND',
                                    },
                                    {
                                      deviceType: {
                                        label: 'People Counting',
                                        value: 2,
                                      },
                                      deviceList: {
                                        label: 'BA-97',
                                        value: 8,
                                      },
                                      status: {
                                        label: 'High',
                                        value: 1,
                                      },
                                      operaType: 'AND',
                                    },
                                  ],
                                  key: '1',
                                  title: '22',
                                  canAdd: null,
                                  type: 'DeviceStatus',
                                  formik: {
                                    values: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: null,
                                            deviceList: null,
                                            status: null,
                                          },
                                        ],
                                        title: '',
                                      },
                                      Condition: {
                                        list: [],
                                        title: '',
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                        title: '',
                                      },
                                      Time: {
                                        time: '',
                                        timeType: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                        title: '',
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                    },
                                    errors: {
                                      DeviceStatus: {
                                        title: 'Required title',
                                        list: [
                                          {
                                            deviceType: 'Required device type',
                                            deviceList: 'Required device list',
                                            status: 'Required status',
                                          },
                                        ],
                                      },
                                    },
                                    touched: {},
                                    isSubmitting: false,
                                    isValidating: false,
                                    submitCount: 0,
                                    initialValues: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: null,
                                            deviceList: null,
                                            status: null,
                                          },
                                        ],
                                        title: '',
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [{}],
                                      },
                                    },
                                    initialErrors: {},
                                    initialTouched: {},
                                    isValid: false,
                                    dirty: true,
                                    validateOnBlur: true,
                                    validateOnChange: true,
                                    validateOnMount: false,
                                  },
                                },
                                {
                                  key: '2',
                                  type: 'DeviceStatus',
                                  list: [
                                    {
                                      deviceType: {
                                        label: 'Humidity',
                                        value: 14,
                                      },
                                      status: {
                                        label: 'Normal',
                                        value: 3,
                                      },
                                      deviceList: {
                                        label: 'BA-94',
                                        value: 5,
                                      },
                                      operaType: 'AND',
                                    },
                                    {
                                      deviceType: {
                                        label: 'Ammonia Sensor',
                                        value: 2,
                                      },
                                      deviceList: {
                                        label: 'BA-96',
                                        value: 7,
                                      },
                                      status: {
                                        label: 'High',
                                        value: 1,
                                      },
                                      operaType: 'AND',
                                    },
                                  ],
                                  title: '22333',
                                  canAdd: null,
                                  formik: {
                                    values: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: null,
                                            deviceList: null,
                                            status: null,
                                          },
                                        ],
                                        title: '',
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [{}],
                                      },
                                    },
                                    errors: {},
                                    touched: {},
                                    isSubmitting: false,
                                    isValidating: false,
                                    submitCount: 0,
                                    initialValues: {
                                      add: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                            deviceType: null,
                                            deviceList: null,
                                            status: null,
                                          },
                                        ],
                                        title: '',
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: '',
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: 'AND',
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: '',
                                        list: [{}],
                                      },
                                    },
                                    initialErrors: {},
                                    initialTouched: {},
                                    isValid: true,
                                    dirty: false,
                                    validateOnBlur: true,
                                    validateOnChange: true,
                                    validateOnMount: false,
                                  },
                                },
                              ],
                              type: 'Condition',
                              key: '3',
                              title: '78',
                              mold: '11',
                              data: {
                                key: '1',
                                list: [
                                  {
                                    deviceType: {
                                      label: 'Motion',
                                      value: 13,
                                    },
                                    status: {
                                      label: 'Medium',
                                      value: 2,
                                    },
                                    deviceList: {
                                      label: 'BA-97',
                                      value: 8,
                                    },
                                    operaType: 'AND',
                                  },
                                  {
                                    deviceType: {
                                      label: 'Paper Towel Dispenser',
                                      value: 3,
                                    },
                                    deviceList: {
                                      label: 'BA-95',
                                      value: 6,
                                    },
                                    status: {
                                      label: 'Medium',
                                      value: 2,
                                    },
                                    operaType: 'OR',
                                  },
                                ],
                                title: '11',
                                canAdd: '',
                                type: 'add',
                              },
                              formik: {
                                values: {
                                  add: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                        deviceType: null,
                                        deviceList: null,
                                        status: null,
                                      },
                                      {
                                        deviceType: {
                                          label: 'Paper Towel Dispenser',
                                          value: 3,
                                        },
                                        deviceList: {
                                          label: 'BA-95',
                                          value: 6,
                                        },
                                        status: {
                                          label: 'Medium',
                                          value: 2,
                                        },
                                        operaType: 'OR',
                                      },
                                    ],
                                    title: '',
                                  },
                                  Condition: {
                                    list: [
                                      {
                                        key: '1',
                                        list: [
                                          {
                                            deviceType: {
                                              label: 'Motion',
                                              value: 13,
                                            },
                                            status: {
                                              label: 'Medium',
                                              value: 2,
                                            },
                                            deviceList: {
                                              label: 'BA-97',
                                              value: 8,
                                            },
                                            operaType: 'AND',
                                          },
                                          {
                                            deviceType: {
                                              label: 'Paper Towel Dispenser',
                                              value: 3,
                                            },
                                            status: {
                                              label: 'Medium',
                                              value: 2,
                                            },
                                            deviceList: {
                                              label: 'BA-95',
                                              value: 6,
                                            },
                                            operaType: 'OR',
                                          },
                                        ],
                                        title: '11',
                                        canAdd: '',
                                        type: 'add',
                                        formik: {
                                          values: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: {
                                                    label: 'Motion',
                                                    value: 13,
                                                  },
                                                  deviceList: {
                                                    label: 'BA-97',
                                                    value: 8,
                                                  },
                                                  status: {
                                                    label: 'Medium',
                                                    value: 2,
                                                  },
                                                },
                                                {
                                                  deviceType: {
                                                    label: 'Paper Towel Dispenser',
                                                    value: 3,
                                                  },
                                                  deviceList: {
                                                    label: 'BA-95',
                                                    value: 6,
                                                  },
                                                  status: {
                                                    label: 'Medium',
                                                    value: 2,
                                                  },
                                                  operaType: 'OR',
                                                },
                                              ],
                                              title: '11',
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Time: {
                                              time: '',
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: '',
                                              list: [{}],
                                            },
                                          },
                                          errors: {},
                                          touched: {
                                            add: {
                                              list: [
                                                {
                                                  deviceType: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  status: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  deviceList: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  operaType: true,
                                                },
                                                {
                                                  deviceType: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  deviceList: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  status: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  operaType: true,
                                                },
                                              ],
                                              title: true,
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: true,
                                                  deviceType: true,
                                                  deviceList: true,
                                                  status: true,
                                                },
                                              ],
                                            },
                                            Time: {
                                              time: true,
                                              timeType: true,
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: true,
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: true,
                                              list: [
                                                {
                                                  cleaner: true,
                                                  turnaroundTime: true,
                                                  turnaroundTimeType: true,
                                                  reminder: true,
                                                  reminderType: true,
                                                },
                                              ],
                                            },
                                          },
                                          isSubmitting: true,
                                          isValidating: false,
                                          submitCount: 1,
                                          initialValues: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: null,
                                                  deviceList: null,
                                                  status: null,
                                                },
                                              ],
                                              title: '',
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Time: {
                                              time: '',
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: '',
                                              list: [{}],
                                            },
                                          },
                                          initialErrors: {},
                                          initialTouched: {},
                                          isValid: true,
                                          dirty: true,
                                          validateOnBlur: true,
                                          validateOnChange: true,
                                          validateOnMount: false,
                                        },
                                      },
                                      {
                                        list: [
                                          {
                                            deviceType: {
                                              label: 'Motion',
                                              value: 13,
                                            },
                                            status: {
                                              label: 'High',
                                              value: 1,
                                            },
                                            deviceList: {
                                              label: 'BA-96',
                                              value: 7,
                                            },
                                            operaType: 'AND',
                                          },
                                          {
                                            deviceType: {
                                              label: 'People Counting',
                                              value: 2,
                                            },
                                            status: {
                                              label: 'High',
                                              value: 1,
                                            },
                                            deviceList: {
                                              label: 'BA-97',
                                              value: 8,
                                            },
                                            operaType: 'AND',
                                          },
                                        ],
                                        key: '1',
                                        title: '22',
                                        canAdd: null,
                                        type: 'DeviceStatus',
                                        formik: {
                                          values: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: null,
                                                  deviceList: null,
                                                  status: null,
                                                },
                                              ],
                                              title: '',
                                            },
                                            Condition: {
                                              list: [],
                                              title: '',
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: {
                                                    label: 'Motion',
                                                    value: 13,
                                                  },
                                                  deviceList: {
                                                    label: 'BA-96',
                                                    value: 7,
                                                  },
                                                  status: {
                                                    label: 'High',
                                                    value: 1,
                                                  },
                                                },
                                                {
                                                  deviceType: {
                                                    label: 'People Counting',
                                                    value: 2,
                                                  },
                                                  deviceList: {
                                                    label: 'BA-97',
                                                    value: 8,
                                                  },
                                                  status: {
                                                    label: 'High',
                                                    value: 1,
                                                  },
                                                  operaType: 'AND',
                                                },
                                              ],
                                              title: '22',
                                            },
                                            Time: {
                                              time: '',
                                              timeType: '',
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                              title: '',
                                            },
                                            Cleaner: {
                                              title: '',
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                          },
                                          errors: {
                                            DeviceStatus: {
                                              title: 'Required title',
                                              list: [
                                                {
                                                  deviceType: 'Required device type',
                                                  deviceList: 'Required device list',
                                                  status: 'Required status',
                                                },
                                              ],
                                            },
                                          },
                                          touched: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: true,
                                                  deviceType: true,
                                                  deviceList: true,
                                                  status: true,
                                                },
                                              ],
                                              title: true,
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  deviceType: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  status: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  deviceList: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  operaType: true,
                                                },
                                                {
                                                  deviceType: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  deviceList: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  status: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  operaType: true,
                                                },
                                              ],
                                              title: true,
                                            },
                                            Time: {
                                              time: true,
                                              timeType: true,
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: true,
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: true,
                                              list: [
                                                {
                                                  cleaner: true,
                                                  turnaroundTime: true,
                                                  turnaroundTimeType: true,
                                                  reminder: true,
                                                  reminderType: true,
                                                },
                                              ],
                                            },
                                          },
                                          isSubmitting: true,
                                          isValidating: false,
                                          submitCount: 1,
                                          initialValues: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: null,
                                                  deviceList: null,
                                                  status: null,
                                                },
                                              ],
                                              title: '',
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Time: {
                                              time: '',
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: '',
                                              list: [{}],
                                            },
                                          },
                                          initialErrors: {},
                                          initialTouched: {},
                                          isValid: true,
                                          dirty: true,
                                          validateOnBlur: true,
                                          validateOnChange: true,
                                          validateOnMount: false,
                                        },
                                      },
                                      {
                                        key: '2',
                                        type: 'DeviceStatus',
                                        list: [
                                          {
                                            deviceType: {
                                              label: 'Humidity',
                                              value: 14,
                                            },
                                            status: {
                                              label: 'Normal',
                                              value: 3,
                                            },
                                            deviceList: {
                                              label: 'BA-94',
                                              value: 5,
                                            },
                                            operaType: 'AND',
                                          },
                                          {
                                            deviceType: {
                                              label: 'Ammonia Sensor',
                                              value: 2,
                                            },
                                            status: {
                                              label: 'High',
                                              value: 1,
                                            },
                                            deviceList: {
                                              label: 'BA-96',
                                              value: 7,
                                            },
                                            operaType: 'AND',
                                          },
                                        ],
                                        title: '22333',
                                        canAdd: null,
                                        formik: {
                                          values: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: null,
                                                  deviceList: null,
                                                  status: null,
                                                },
                                              ],
                                              title: '',
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: {
                                                    label: 'Humidity',
                                                    value: 14,
                                                  },
                                                  deviceList: {
                                                    label: 'BA-94',
                                                    value: 5,
                                                  },
                                                  status: {
                                                    label: 'Normal',
                                                    value: 3,
                                                  },
                                                },
                                                {
                                                  deviceType: {
                                                    label: 'Ammonia Sensor',
                                                    value: 2,
                                                  },
                                                  deviceList: {
                                                    label: 'BA-96',
                                                    value: 7,
                                                  },
                                                  status: {
                                                    label: 'High',
                                                    value: 1,
                                                  },
                                                  operaType: 'AND',
                                                },
                                              ],
                                              key: '2',
                                              type: 'DeviceStatus',
                                              title: '22333',
                                              canAdd: null,
                                              formik: {
                                                values: {
                                                  add: {
                                                    list: [
                                                      {
                                                        operaType: 'AND',
                                                        deviceType: null,
                                                        deviceList: null,
                                                        status: null,
                                                      },
                                                    ],
                                                    title: '',
                                                  },
                                                  Condition: {
                                                    list: [],
                                                  },
                                                  DeviceStatus: {
                                                    list: [
                                                      {
                                                        operaType: 'AND',
                                                      },
                                                    ],
                                                  },
                                                  Time: {
                                                    time: '',
                                                  },
                                                  Robot: {
                                                    list: [
                                                      {
                                                        operaType: 'AND',
                                                      },
                                                    ],
                                                  },
                                                  Cleaner: {
                                                    title: '',
                                                    list: [{}],
                                                  },
                                                },
                                                errors: {},
                                                touched: {},
                                                isSubmitting: false,
                                                isValidating: false,
                                                submitCount: 0,
                                                initialValues: {
                                                  add: {
                                                    list: [
                                                      {
                                                        operaType: 'AND',
                                                        deviceType: null,
                                                        deviceList: null,
                                                        status: null,
                                                      },
                                                    ],
                                                    title: '',
                                                  },
                                                  Condition: {
                                                    list: [],
                                                  },
                                                  DeviceStatus: {
                                                    list: [
                                                      {
                                                        operaType: 'AND',
                                                      },
                                                    ],
                                                  },
                                                  Time: {
                                                    time: '',
                                                  },
                                                  Robot: {
                                                    list: [
                                                      {
                                                        operaType: 'AND',
                                                      },
                                                    ],
                                                  },
                                                  Cleaner: {
                                                    title: '',
                                                    list: [{}],
                                                  },
                                                },
                                                initialErrors: {},
                                                initialTouched: {},
                                                isValid: true,
                                                dirty: false,
                                                validateOnBlur: true,
                                                validateOnChange: true,
                                                validateOnMount: false,
                                              },
                                            },
                                            Time: {
                                              time: '',
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: '',
                                              list: [{}],
                                            },
                                          },
                                          errors: {},
                                          touched: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: true,
                                                  deviceType: true,
                                                  deviceList: true,
                                                  status: true,
                                                },
                                              ],
                                              title: true,
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  deviceType: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  status: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  deviceList: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  operaType: true,
                                                },
                                                {
                                                  deviceType: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  deviceList: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  status: {
                                                    label: true,
                                                    value: true,
                                                  },
                                                  operaType: true,
                                                },
                                              ],
                                              title: true,
                                            },
                                            Time: {
                                              time: true,
                                              timeType: true,
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: true,
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: true,
                                              list: [
                                                {
                                                  cleaner: true,
                                                  turnaroundTime: true,
                                                  turnaroundTimeType: true,
                                                  reminder: true,
                                                  reminderType: true,
                                                },
                                              ],
                                            },
                                          },
                                          isSubmitting: true,
                                          isValidating: false,
                                          submitCount: 1,
                                          initialValues: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                  deviceType: null,
                                                  deviceList: null,
                                                  status: null,
                                                },
                                              ],
                                              title: '',
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Time: {
                                              time: '',
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: 'AND',
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: '',
                                              list: [{}],
                                            },
                                          },
                                          initialErrors: {},
                                          initialTouched: {},
                                          isValid: true,
                                          dirty: true,
                                          validateOnBlur: true,
                                          validateOnChange: true,
                                          validateOnMount: false,
                                        },
                                      },
                                    ],
                                  },
                                  DeviceStatus: {
                                    list: [
                                      {
                                        deviceType: {
                                          label: 'Motion',
                                          value: 13,
                                        },
                                        status: {
                                          label: 'High',
                                          value: 1,
                                        },
                                        deviceList: {
                                          label: 'BA-96',
                                          value: 7,
                                        },
                                        operaType: 'AND',
                                      },
                                      {
                                        deviceType: {
                                          label: 'People Counting',
                                          value: 2,
                                        },
                                        deviceList: {
                                          label: 'BA-97',
                                          value: 8,
                                        },
                                        status: {
                                          label: 'High',
                                          value: 1,
                                        },
                                        operaType: 'AND',
                                      },
                                    ],
                                    title: '22',
                                  },
                                  Time: {
                                    time: '',
                                  },
                                  Robot: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                      },
                                    ],
                                  },
                                  Cleaner: {
                                    title: '',
                                    list: [{}],
                                  },
                                },
                                errors: {},
                                touched: {
                                  add: {
                                    list: [
                                      {
                                        operaType: true,
                                        deviceType: true,
                                        deviceList: true,
                                        status: true,
                                      },
                                      {
                                        deviceType: {
                                          label: true,
                                          value: true,
                                        },
                                        deviceList: {
                                          label: true,
                                          value: true,
                                        },
                                        status: {
                                          label: true,
                                          value: true,
                                        },
                                        operaType: true,
                                      },
                                    ],
                                    title: true,
                                  },
                                  Condition: {
                                    list: [],
                                  },
                                  DeviceStatus: {
                                    list: [
                                      {
                                        deviceType: {
                                          label: true,
                                          value: true,
                                        },
                                        status: {
                                          label: true,
                                          value: true,
                                        },
                                        deviceList: {
                                          label: true,
                                          value: true,
                                        },
                                        operaType: true,
                                      },
                                      {
                                        deviceType: {
                                          label: true,
                                          value: true,
                                        },
                                        deviceList: {
                                          label: true,
                                          value: true,
                                        },
                                        status: {
                                          label: true,
                                          value: true,
                                        },
                                        operaType: true,
                                      },
                                    ],
                                    title: true,
                                  },
                                  Time: {
                                    time: true,
                                    timeType: true,
                                  },
                                  Robot: {
                                    list: [
                                      {
                                        operaType: true,
                                      },
                                    ],
                                  },
                                  Cleaner: {
                                    title: true,
                                    list: [
                                      {
                                        cleaner: true,
                                        turnaroundTime: true,
                                        turnaroundTimeType: true,
                                        reminder: true,
                                        reminderType: true,
                                      },
                                    ],
                                  },
                                },
                                isSubmitting: false,
                                isValidating: true,
                                submitCount: 0,
                                initialValues: {
                                  add: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                        deviceType: null,
                                        deviceList: null,
                                        status: null,
                                      },
                                    ],
                                    title: '',
                                  },
                                  Condition: {
                                    list: [],
                                  },
                                  DeviceStatus: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                      },
                                    ],
                                  },
                                  Time: {
                                    time: '',
                                  },
                                  Robot: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                      },
                                    ],
                                  },
                                  Cleaner: {
                                    title: '',
                                    list: [{}],
                                  },
                                },
                                initialErrors: {},
                                initialTouched: {},
                                isValid: true,
                                dirty: true,
                                validateOnBlur: true,
                                validateOnChange: true,
                                validateOnMount: false,
                              },
                            },
                            DeviceStatus: {
                              list: [
                                {
                                  operaType: 'AND',
                                  deviceType: {
                                    label: 'Humidity',
                                    value: 14,
                                  },
                                  deviceList: {
                                    label: 'BA-94',
                                    value: 5,
                                  },
                                  status: {
                                    label: 'Normal',
                                    value: 3,
                                  },
                                },
                                {
                                  deviceType: {
                                    label: 'Ammonia Sensor',
                                    value: 2,
                                  },
                                  deviceList: {
                                    label: 'BA-96',
                                    value: 7,
                                  },
                                  status: {
                                    label: 'High',
                                    value: 1,
                                  },
                                  operaType: 'AND',
                                },
                              ],
                              key: '2',
                              type: 'DeviceStatus',
                              title: '22333',
                              canAdd: null,
                              formik: {
                                values: {
                                  add: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                        deviceType: null,
                                        deviceList: null,
                                        status: null,
                                      },
                                    ],
                                    title: '',
                                  },
                                  Condition: {
                                    list: [],
                                  },
                                  DeviceStatus: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                      },
                                    ],
                                  },
                                  Time: {
                                    time: '',
                                  },
                                  Robot: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                      },
                                    ],
                                  },
                                  Cleaner: {
                                    title: '',
                                    list: [{}],
                                  },
                                },
                                errors: {},
                                touched: {},
                                isSubmitting: false,
                                isValidating: false,
                                submitCount: 0,
                                initialValues: {
                                  add: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                        deviceType: null,
                                        deviceList: null,
                                        status: null,
                                      },
                                    ],
                                    title: '',
                                  },
                                  Condition: {
                                    list: [],
                                  },
                                  DeviceStatus: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                      },
                                    ],
                                  },
                                  Time: {
                                    time: '',
                                  },
                                  Robot: {
                                    list: [
                                      {
                                        operaType: 'AND',
                                      },
                                    ],
                                  },
                                  Cleaner: {
                                    title: '',
                                    list: [{}],
                                  },
                                },
                                initialErrors: {},
                                initialTouched: {},
                                isValid: true,
                                dirty: false,
                                validateOnBlur: true,
                                validateOnChange: true,
                                validateOnMount: false,
                              },
                            },
                            Time: {
                              time: '',
                            },
                            Robot: {
                              list: [
                                {
                                  operaType: 'AND',
                                },
                              ],
                            },
                            Cleaner: {
                              title: '',
                              list: [{}],
                            },
                          },
                          errors: {},
                          touched: {
                            add: {
                              list: [
                                {
                                  operaType: true,
                                  deviceType: true,
                                  deviceList: true,
                                  status: true,
                                },
                              ],
                              title: true,
                            },
                            Condition: {
                              list: [],
                            },
                            DeviceStatus: {
                              list: [
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                              ],
                              title: true,
                            },
                            Time: {
                              time: true,
                              timeType: true,
                            },
                            Robot: {
                              list: [
                                {
                                  operaType: true,
                                },
                              ],
                            },
                            Cleaner: {
                              title: true,
                              list: [
                                {
                                  cleaner: true,
                                  turnaroundTime: true,
                                  turnaroundTimeType: true,
                                  reminder: true,
                                  reminderType: true,
                                },
                              ],
                            },
                          },
                          isSubmitting: false,
                          isValidating: false,
                          submitCount: 0,
                          initialValues: {
                            add: {
                              list: [
                                {
                                  operaType: 'AND',
                                  deviceType: null,
                                  deviceList: null,
                                  status: null,
                                },
                              ],
                              title: '',
                            },
                            Condition: {
                              list: [],
                            },
                            DeviceStatus: {
                              list: [
                                {
                                  operaType: 'AND',
                                },
                              ],
                            },
                            Time: {
                              time: '',
                            },
                            Robot: {
                              list: [
                                {
                                  operaType: 'AND',
                                },
                              ],
                            },
                            Cleaner: {
                              title: '',
                              list: [{}],
                            },
                          },
                          initialErrors: {},
                          initialTouched: {},
                          isValid: true,
                          dirty: true,
                          validateOnBlur: true,
                          validateOnChange: true,
                          validateOnMount: false,
                        },
                      },
                      Time: {
                        time: '',
                      },
                      Robot: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                      Cleaner: {
                        title: '',
                        list: [{}],
                      },
                    },
                    errors: {},
                    touched: {
                      add: {
                        list: [
                          {
                            operaType: true,
                            deviceType: true,
                            deviceList: true,
                            status: true,
                          },
                        ],
                        title: true,
                      },
                      Condition: {
                        list: [
                          {
                            key: true,
                            list: [
                              {
                                deviceType: {
                                  label: true,
                                  value: true,
                                },
                                status: {
                                  label: true,
                                  value: true,
                                },
                                deviceList: {
                                  label: true,
                                  value: true,
                                },
                                operaType: true,
                              },
                              {
                                deviceType: {
                                  label: true,
                                  value: true,
                                },
                                deviceList: {
                                  label: true,
                                  value: true,
                                },
                                status: {
                                  label: true,
                                  value: true,
                                },
                                operaType: true,
                              },
                            ],
                            title: true,
                            canAdd: true,
                            type: true,
                            editNode: true,
                            addNewType: true,
                          },
                          {
                            list: [
                              {
                                deviceType: {
                                  label: true,
                                  value: true,
                                },
                                status: {
                                  label: true,
                                  value: true,
                                },
                                deviceList: {
                                  label: true,
                                  value: true,
                                },
                                operaType: true,
                              },
                              {
                                deviceType: {
                                  label: true,
                                  value: true,
                                },
                                deviceList: {
                                  label: true,
                                  value: true,
                                },
                                status: {
                                  label: true,
                                  value: true,
                                },
                                operaType: true,
                              },
                            ],
                            key: true,
                            title: true,
                            canAdd: true,
                            type: true,
                            addNewType: true,
                            formik: {
                              values: {
                                add: {
                                  list: [
                                    {
                                      operaType: true,
                                      deviceType: true,
                                      deviceList: true,
                                      status: true,
                                    },
                                  ],
                                  title: true,
                                },
                                Condition: {
                                  list: [],
                                  title: true,
                                },
                                DeviceStatus: {
                                  list: [
                                    {
                                      operaType: true,
                                      deviceType: true,
                                      deviceList: true,
                                      status: true,
                                    },
                                  ],
                                  title: true,
                                },
                                Time: {
                                  time: true,
                                  timeType: true,
                                },
                                Robot: {
                                  list: [
                                    {
                                      operaType: true,
                                    },
                                  ],
                                  title: true,
                                },
                                Cleaner: {
                                  title: true,
                                  list: [
                                    {
                                      operaType: true,
                                    },
                                  ],
                                },
                              },
                              errors: {
                                DeviceStatus: {
                                  title: true,
                                  list: [
                                    {
                                      deviceType: true,
                                      deviceList: true,
                                      status: true,
                                    },
                                  ],
                                },
                              },
                              touched: {},
                              status: true,
                              isSubmitting: true,
                              isValidating: true,
                              submitCount: true,
                              initialValues: {
                                add: {
                                  list: [
                                    {
                                      operaType: true,
                                      deviceType: true,
                                      deviceList: true,
                                      status: true,
                                    },
                                  ],
                                  title: true,
                                },
                                Condition: {
                                  list: [],
                                },
                                DeviceStatus: {
                                  list: [
                                    {
                                      operaType: true,
                                      deviceType: true,
                                      deviceList: true,
                                      status: true,
                                    },
                                  ],
                                },
                                Time: {
                                  time: true,
                                  timeType: true,
                                },
                                Robot: {
                                  list: [
                                    {
                                      operaType: true,
                                    },
                                  ],
                                },
                                Cleaner: {
                                  title: true,
                                  list: [
                                    {
                                      cleaner: true,
                                      turnaroundTime: true,
                                      turnaroundTimeType: true,
                                      reminder: true,
                                      reminderType: true,
                                    },
                                  ],
                                },
                              },
                              initialErrors: {},
                              initialTouched: {},
                              initialStatus: true,
                              handleBlur: true,
                              handleChange: true,
                              handleReset: true,
                              handleSubmit: true,
                              resetForm: true,
                              setErrors: true,
                              setFormikState: true,
                              setFieldTouched: true,
                              setFieldValue: true,
                              setFieldError: true,
                              setStatus: true,
                              setSubmitting: true,
                              setTouched: true,
                              setValues: true,
                              submitForm: true,
                              validateForm: true,
                              validateField: true,
                              isValid: true,
                              dirty: true,
                              unregisterField: true,
                              registerField: true,
                              getFieldProps: true,
                              getFieldMeta: true,
                              getFieldHelpers: true,
                              validateOnBlur: true,
                              validateOnChange: true,
                              validateOnMount: true,
                            },
                          },
                          {
                            key: true,
                            type: true,
                            editNode: true,
                            list: [
                              {
                                deviceType: {
                                  label: true,
                                  value: true,
                                },
                                status: {
                                  label: true,
                                  value: true,
                                },
                                deviceList: {
                                  label: true,
                                  value: true,
                                },
                                operaType: true,
                              },
                              {
                                deviceType: {
                                  label: true,
                                  value: true,
                                },
                                deviceList: {
                                  label: true,
                                  value: true,
                                },
                                status: {
                                  label: true,
                                  value: true,
                                },
                                operaType: true,
                              },
                            ],
                            title: true,
                            canAdd: true,
                            addNewType: true,
                            formik: {
                              values: {
                                add: {
                                  list: [
                                    {
                                      operaType: true,
                                      deviceType: true,
                                      deviceList: true,
                                      status: true,
                                    },
                                  ],
                                  title: true,
                                },
                                Condition: {
                                  list: [],
                                },
                                DeviceStatus: {
                                  list: [
                                    {
                                      operaType: true,
                                      deviceType: true,
                                      deviceList: true,
                                      status: true,
                                    },
                                  ],
                                },
                                Time: {
                                  time: true,
                                  timeType: true,
                                },
                                Robot: {
                                  list: [
                                    {
                                      operaType: true,
                                    },
                                  ],
                                },
                                Cleaner: {
                                  title: true,
                                  list: [
                                    {
                                      cleaner: true,
                                      turnaroundTime: true,
                                      turnaroundTimeType: true,
                                      reminder: true,
                                      reminderType: true,
                                    },
                                  ],
                                },
                              },
                              errors: {},
                              touched: {},
                              status: true,
                              isSubmitting: true,
                              isValidating: true,
                              submitCount: true,
                              initialValues: {
                                add: {
                                  list: [
                                    {
                                      operaType: true,
                                      deviceType: true,
                                      deviceList: true,
                                      status: true,
                                    },
                                  ],
                                  title: true,
                                },
                                Condition: {
                                  list: [],
                                },
                                DeviceStatus: {
                                  list: [
                                    {
                                      operaType: true,
                                      deviceType: true,
                                      deviceList: true,
                                      status: true,
                                    },
                                  ],
                                },
                                Time: {
                                  time: true,
                                  timeType: true,
                                },
                                Robot: {
                                  list: [
                                    {
                                      operaType: true,
                                    },
                                  ],
                                },
                                Cleaner: {
                                  title: true,
                                  list: [
                                    {
                                      cleaner: true,
                                      turnaroundTime: true,
                                      turnaroundTimeType: true,
                                      reminder: true,
                                      reminderType: true,
                                    },
                                  ],
                                },
                              },
                              initialErrors: {},
                              initialTouched: {},
                              initialStatus: true,
                              handleBlur: true,
                              handleChange: true,
                              handleReset: true,
                              handleSubmit: true,
                              resetForm: true,
                              setErrors: true,
                              setFormikState: true,
                              setFieldTouched: true,
                              setFieldValue: true,
                              setFieldError: true,
                              setStatus: true,
                              setSubmitting: true,
                              setTouched: true,
                              setValues: true,
                              submitForm: true,
                              validateForm: true,
                              validateField: true,
                              isValid: true,
                              dirty: true,
                              unregisterField: true,
                              registerField: true,
                              getFieldProps: true,
                              getFieldMeta: true,
                              getFieldHelpers: true,
                              validateOnBlur: true,
                              validateOnChange: true,
                              validateOnMount: true,
                            },
                          },
                        ],
                        type: true,
                        key: true,
                        editNode: true,
                        title: true,
                        mold: true,
                        data: {
                          key: true,
                          list: [
                            {
                              deviceType: {
                                label: true,
                                value: true,
                              },
                              status: {
                                label: true,
                                value: true,
                              },
                              deviceList: {
                                label: true,
                                value: true,
                              },
                              operaType: true,
                            },
                            {
                              deviceType: {
                                label: true,
                                value: true,
                              },
                              deviceList: {
                                label: true,
                                value: true,
                              },
                              status: {
                                label: true,
                                value: true,
                              },
                              operaType: true,
                            },
                          ],
                          title: true,
                          canAdd: true,
                          type: true,
                          editNode: true,
                          addNewType: true,
                        },
                        formik: {
                          values: {
                            add: {
                              list: [
                                {
                                  operaType: true,
                                  deviceType: true,
                                  deviceList: true,
                                  status: true,
                                },
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                              ],
                              title: true,
                            },
                            Condition: {
                              list: [
                                {
                                  key: true,
                                  list: [
                                    {
                                      deviceType: {
                                        label: true,
                                        value: true,
                                      },
                                      status: {
                                        label: true,
                                        value: true,
                                      },
                                      deviceList: {
                                        label: true,
                                        value: true,
                                      },
                                      operaType: true,
                                    },
                                    {
                                      deviceType: {
                                        label: true,
                                        value: true,
                                      },
                                      status: {
                                        label: true,
                                        value: true,
                                      },
                                      deviceList: {
                                        label: true,
                                        value: true,
                                      },
                                      operaType: true,
                                    },
                                  ],
                                  title: true,
                                  canAdd: true,
                                  type: true,
                                  editNode: true,
                                  addNewType: true,
                                  formik: {
                                    values: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                          },
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    errors: {},
                                    touched: {
                                      add: {
                                        list: [
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    status: true,
                                    isSubmitting: true,
                                    isValidating: true,
                                    submitCount: true,
                                    initialValues: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    initialErrors: {},
                                    initialTouched: {},
                                    initialStatus: true,
                                    handleBlur: true,
                                    handleChange: true,
                                    handleReset: true,
                                    handleSubmit: true,
                                    resetForm: true,
                                    setErrors: true,
                                    setFormikState: true,
                                    setFieldTouched: true,
                                    setFieldValue: true,
                                    setFieldError: true,
                                    setStatus: true,
                                    setSubmitting: true,
                                    setTouched: true,
                                    setValues: true,
                                    submitForm: true,
                                    validateForm: true,
                                    validateField: true,
                                    isValid: true,
                                    dirty: true,
                                    unregisterField: true,
                                    registerField: true,
                                    getFieldProps: true,
                                    getFieldMeta: true,
                                    getFieldHelpers: true,
                                    validateOnBlur: true,
                                    validateOnChange: true,
                                    validateOnMount: true,
                                  },
                                },
                                {
                                  list: [
                                    {
                                      deviceType: {
                                        label: true,
                                        value: true,
                                      },
                                      status: {
                                        label: true,
                                        value: true,
                                      },
                                      deviceList: {
                                        label: true,
                                        value: true,
                                      },
                                      operaType: true,
                                    },
                                    {
                                      deviceType: {
                                        label: true,
                                        value: true,
                                      },
                                      status: {
                                        label: true,
                                        value: true,
                                      },
                                      deviceList: {
                                        label: true,
                                        value: true,
                                      },
                                      operaType: true,
                                    },
                                  ],
                                  key: true,
                                  title: true,
                                  canAdd: true,
                                  type: true,
                                  addNewType: true,
                                  formik: {
                                    values: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                        title: true,
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                          },
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            operaType: true,
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    errors: {
                                      DeviceStatus: {
                                        title: true,
                                        list: [
                                          {
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                      },
                                    },
                                    touched: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    status: true,
                                    isSubmitting: true,
                                    isValidating: true,
                                    submitCount: true,
                                    initialValues: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    initialErrors: {},
                                    initialTouched: {},
                                    initialStatus: true,
                                    handleBlur: true,
                                    handleChange: true,
                                    handleReset: true,
                                    handleSubmit: true,
                                    resetForm: true,
                                    setErrors: true,
                                    setFormikState: true,
                                    setFieldTouched: true,
                                    setFieldValue: true,
                                    setFieldError: true,
                                    setStatus: true,
                                    setSubmitting: true,
                                    setTouched: true,
                                    setValues: true,
                                    submitForm: true,
                                    validateForm: true,
                                    validateField: true,
                                    isValid: true,
                                    dirty: true,
                                    unregisterField: true,
                                    registerField: true,
                                    getFieldProps: true,
                                    getFieldMeta: true,
                                    getFieldHelpers: true,
                                    validateOnBlur: true,
                                    validateOnChange: true,
                                    validateOnMount: true,
                                  },
                                },
                                {
                                  key: true,
                                  type: true,
                                  editNode: true,
                                  list: [
                                    {
                                      deviceType: {
                                        label: true,
                                        value: true,
                                      },
                                      status: {
                                        label: true,
                                        value: true,
                                      },
                                      deviceList: {
                                        label: true,
                                        value: true,
                                      },
                                      operaType: true,
                                    },
                                    {
                                      deviceType: {
                                        label: true,
                                        value: true,
                                      },
                                      status: {
                                        label: true,
                                        value: true,
                                      },
                                      deviceList: {
                                        label: true,
                                        value: true,
                                      },
                                      operaType: true,
                                    },
                                  ],
                                  title: true,
                                  canAdd: true,
                                  addNewType: true,
                                  formik: {
                                    values: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                          },
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                        ],
                                        key: true,
                                        type: true,
                                        editNode: true,
                                        title: true,
                                        canAdd: true,
                                        addNewType: true,
                                        formik: {
                                          values: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: true,
                                                  deviceType: true,
                                                  deviceList: true,
                                                  status: true,
                                                },
                                              ],
                                              title: true,
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: true,
                                                  deviceType: true,
                                                  deviceList: true,
                                                  status: true,
                                                },
                                              ],
                                            },
                                            Time: {
                                              time: true,
                                              timeType: true,
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: true,
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: true,
                                              list: [
                                                {
                                                  cleaner: true,
                                                  turnaroundTime: true,
                                                  turnaroundTimeType: true,
                                                  reminder: true,
                                                  reminderType: true,
                                                },
                                              ],
                                            },
                                          },
                                          errors: {},
                                          touched: {},
                                          status: true,
                                          isSubmitting: true,
                                          isValidating: true,
                                          submitCount: true,
                                          initialValues: {
                                            add: {
                                              list: [
                                                {
                                                  operaType: true,
                                                  deviceType: true,
                                                  deviceList: true,
                                                  status: true,
                                                },
                                              ],
                                              title: true,
                                            },
                                            Condition: {
                                              list: [],
                                            },
                                            DeviceStatus: {
                                              list: [
                                                {
                                                  operaType: true,
                                                  deviceType: true,
                                                  deviceList: true,
                                                  status: true,
                                                },
                                              ],
                                            },
                                            Time: {
                                              time: true,
                                              timeType: true,
                                            },
                                            Robot: {
                                              list: [
                                                {
                                                  operaType: true,
                                                },
                                              ],
                                            },
                                            Cleaner: {
                                              title: true,
                                              list: [
                                                {
                                                  cleaner: true,
                                                  turnaroundTime: true,
                                                  turnaroundTimeType: true,
                                                  reminder: true,
                                                  reminderType: true,
                                                },
                                              ],
                                            },
                                          },
                                          initialErrors: {},
                                          initialTouched: {},
                                          initialStatus: true,
                                          handleBlur: true,
                                          handleChange: true,
                                          handleReset: true,
                                          handleSubmit: true,
                                          resetForm: true,
                                          setErrors: true,
                                          setFormikState: true,
                                          setFieldTouched: true,
                                          setFieldValue: true,
                                          setFieldError: true,
                                          setStatus: true,
                                          setSubmitting: true,
                                          setTouched: true,
                                          setValues: true,
                                          submitForm: true,
                                          validateForm: true,
                                          validateField: true,
                                          isValid: true,
                                          dirty: true,
                                          unregisterField: true,
                                          registerField: true,
                                          getFieldProps: true,
                                          getFieldMeta: true,
                                          getFieldHelpers: true,
                                          validateOnBlur: true,
                                          validateOnChange: true,
                                          validateOnMount: true,
                                        },
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    errors: {},
                                    touched: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                          {
                                            deviceType: {
                                              label: true,
                                              value: true,
                                            },
                                            deviceList: {
                                              label: true,
                                              value: true,
                                            },
                                            status: {
                                              label: true,
                                              value: true,
                                            },
                                            operaType: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    status: true,
                                    isSubmitting: true,
                                    isValidating: true,
                                    submitCount: true,
                                    initialValues: {
                                      add: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                        title: true,
                                      },
                                      Condition: {
                                        list: [],
                                      },
                                      DeviceStatus: {
                                        list: [
                                          {
                                            operaType: true,
                                            deviceType: true,
                                            deviceList: true,
                                            status: true,
                                          },
                                        ],
                                      },
                                      Time: {
                                        time: true,
                                        timeType: true,
                                      },
                                      Robot: {
                                        list: [
                                          {
                                            operaType: true,
                                          },
                                        ],
                                      },
                                      Cleaner: {
                                        title: true,
                                        list: [
                                          {
                                            cleaner: true,
                                            turnaroundTime: true,
                                            turnaroundTimeType: true,
                                            reminder: true,
                                            reminderType: true,
                                          },
                                        ],
                                      },
                                    },
                                    initialErrors: {},
                                    initialTouched: {},
                                    initialStatus: true,
                                    handleBlur: true,
                                    handleChange: true,
                                    handleReset: true,
                                    handleSubmit: true,
                                    resetForm: true,
                                    setErrors: true,
                                    setFormikState: true,
                                    setFieldTouched: true,
                                    setFieldValue: true,
                                    setFieldError: true,
                                    setStatus: true,
                                    setSubmitting: true,
                                    setTouched: true,
                                    setValues: true,
                                    submitForm: true,
                                    validateForm: true,
                                    validateField: true,
                                    isValid: true,
                                    dirty: true,
                                    unregisterField: true,
                                    registerField: true,
                                    getFieldProps: true,
                                    getFieldMeta: true,
                                    getFieldHelpers: true,
                                    validateOnBlur: true,
                                    validateOnChange: true,
                                    validateOnMount: true,
                                  },
                                },
                              ],
                            },
                            DeviceStatus: {
                              list: [
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                              ],
                              title: true,
                            },
                            Time: {
                              time: true,
                              timeType: true,
                            },
                            Robot: {
                              list: [
                                {
                                  operaType: true,
                                },
                              ],
                            },
                            Cleaner: {
                              title: true,
                              list: [
                                {
                                  cleaner: true,
                                  turnaroundTime: true,
                                  turnaroundTimeType: true,
                                  reminder: true,
                                  reminderType: true,
                                },
                              ],
                            },
                          },
                          errors: {},
                          touched: {
                            add: {
                              list: [
                                {
                                  operaType: true,
                                  deviceType: true,
                                  deviceList: true,
                                  status: true,
                                },
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                              ],
                              title: true,
                            },
                            Condition: {
                              list: [],
                            },
                            DeviceStatus: {
                              list: [
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                                {
                                  deviceType: {
                                    label: true,
                                    value: true,
                                  },
                                  deviceList: {
                                    label: true,
                                    value: true,
                                  },
                                  status: {
                                    label: true,
                                    value: true,
                                  },
                                  operaType: true,
                                },
                              ],
                              title: true,
                            },
                            Time: {
                              time: true,
                              timeType: true,
                            },
                            Robot: {
                              list: [
                                {
                                  operaType: true,
                                },
                              ],
                            },
                            Cleaner: {
                              title: true,
                              list: [
                                {
                                  cleaner: true,
                                  turnaroundTime: true,
                                  turnaroundTimeType: true,
                                  reminder: true,
                                  reminderType: true,
                                },
                              ],
                            },
                          },
                          status: true,
                          isSubmitting: true,
                          isValidating: true,
                          submitCount: true,
                          initialValues: {
                            add: {
                              list: [
                                {
                                  operaType: true,
                                  deviceType: true,
                                  deviceList: true,
                                  status: true,
                                },
                              ],
                              title: true,
                            },
                            Condition: {
                              list: [],
                            },
                            DeviceStatus: {
                              list: [
                                {
                                  operaType: true,
                                  deviceType: true,
                                  deviceList: true,
                                  status: true,
                                },
                              ],
                            },
                            Time: {
                              time: true,
                              timeType: true,
                            },
                            Robot: {
                              list: [
                                {
                                  operaType: true,
                                },
                              ],
                            },
                            Cleaner: {
                              title: true,
                              list: [
                                {
                                  cleaner: true,
                                  turnaroundTime: true,
                                  turnaroundTimeType: true,
                                  reminder: true,
                                  reminderType: true,
                                },
                              ],
                            },
                          },
                          initialErrors: {},
                          initialTouched: {},
                          initialStatus: true,
                          handleBlur: true,
                          handleChange: true,
                          handleReset: true,
                          handleSubmit: true,
                          resetForm: true,
                          setErrors: true,
                          setFormikState: true,
                          setFieldTouched: true,
                          setFieldValue: true,
                          setFieldError: true,
                          setStatus: true,
                          setSubmitting: true,
                          setTouched: true,
                          setValues: true,
                          submitForm: true,
                          validateForm: true,
                          validateField: true,
                          isValid: true,
                          dirty: true,
                          unregisterField: true,
                          registerField: true,
                          getFieldProps: true,
                          getFieldMeta: true,
                          getFieldHelpers: true,
                          validateOnBlur: true,
                          validateOnChange: true,
                          validateOnMount: true,
                        },
                      },
                      DeviceStatus: {
                        list: [
                          {
                            deviceType: {
                              label: true,
                              value: true,
                            },
                            status: {
                              label: true,
                              value: true,
                            },
                            deviceList: {
                              label: true,
                              value: true,
                            },
                            operaType: true,
                          },
                          {
                            deviceType: {
                              label: true,
                              value: true,
                            },
                            deviceList: {
                              label: true,
                              value: true,
                            },
                            status: {
                              label: true,
                              value: true,
                            },
                            operaType: true,
                          },
                          {
                            deviceType: {
                              label: true,
                              value: true,
                            },
                            deviceList: {
                              label: true,
                              value: true,
                            },
                            status: {
                              label: true,
                              value: true,
                            },
                            operaType: true,
                          },
                        ],
                        title: true,
                      },
                      Time: {
                        time: true,
                        timeType: true,
                      },
                      Robot: {
                        list: [
                          {
                            operaType: true,
                          },
                        ],
                      },
                      Cleaner: {
                        title: true,
                        list: [
                          {
                            cleaner: true,
                            turnaroundTime: true,
                            turnaroundTimeType: true,
                            reminder: true,
                            reminderType: true,
                          },
                        ],
                      },
                    },
                    isSubmitting: true,
                    isValidating: false,
                    submitCount: 1,
                    initialValues: {
                      add: {
                        list: [
                          {
                            operaType: 'AND',
                            deviceType: null,
                            deviceList: null,
                            status: null,
                          },
                        ],
                        title: '',
                      },
                      Condition: {
                        list: [],
                      },
                      DeviceStatus: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                      Time: {
                        time: '',
                      },
                      Robot: {
                        list: [
                          {
                            operaType: 'AND',
                          },
                        ],
                      },
                      Cleaner: {
                        title: '',
                        list: [{}],
                      },
                    },
                    initialErrors: {},
                    initialTouched: {},
                    isValid: true,
                    dirty: true,
                    validateOnBlur: true,
                    validateOnChange: true,
                    validateOnMount: false,
                  },
                },
              ],
              key: '3-1-2',
              title: '阿斯蒂芬',
              canAdd: '22333',
              type: 'Condition',
            },
            children: [
              {
                id: '3-1-2-0',
                type: 'custom-condiction-children',
                data: {
                  key: '3-1-2-0',
                  title: '',
                  canAdd: 'add',
                  type: 'Normal',
                },
                children: [],
                title: '',
                canAdd: 'add',
              },
              {
                id: '3-1-2-1',
                type: 'custom-condiction-children',
                data: {
                  key: '3-1-2-1',
                  title: '',
                  canAdd: 'add',
                  type: 'High',
                },
                children: [],
                title: '',
                canAdd: 'add',
              },
              {
                id: '3-1-2-2',
                type: 'custom-condiction-children',
                data: {
                  key: '3-1-2-2',
                  title: '',
                  canAdd: 'add',
                  type: 'High',
                },
                children: [],
                title: '',
                canAdd: 'add',
              },
            ],
            title: '阿斯蒂芬',
            canAdd: '22333',
          },
        ],
        title: '',
        canAdd: '',
      },
    ],
    title: '78',
    canAdd: '11',
  },
]
export const treeData5 = [
  {
    id: '1',
    type: 'custom-normal-node',
    data: {
      list: [
        {
          deviceType: {
            label: 'Door',
            value: 16,
          },
          status: {
            label: 'Normal',
            value: 3,
          },
          deviceList: {
            label: 'BA-92',
            value: 3,
          },
          operaType: 'AND',
        },
      ],
      key: '1',
      title: '士大夫鹅鹅鹅88',
      canAdd: '',
      type: 'add',
    },
    children: [],
    title: '士大夫鹅鹅鹅88',
    canAdd: '',
  },
  {
    id: '2',
    type: 'custom-condiction',
    data: {
      list: [
        {
          key: '1',
          list: [
            {
              deviceType: {
                label: 'Door',
                value: 16,
              },
              status: {
                label: 'Normal',
                value: 3,
              },
              deviceList: {
                label: 'BA-92',
                value: 3,
              },
              operaType: 'AND',
            },
          ],
          title: '士大夫鹅鹅鹅88',
          canAdd: null,
          type: 'add',
          formik: {
            values: {
              add: {
                list: [
                  {
                    operaType: 'AND',
                    deviceType: {
                      label: 'Door',
                      value: 16,
                    },
                    deviceList: {
                      label: 'BA-92',
                      value: 3,
                    },
                    status: {
                      label: 'Normal',
                      value: 3,
                    },
                  },
                ],
                title: '士大夫鹅鹅鹅88',
              },
              Condition: {
                list: [],
                title: '',
              },
              DeviceStatus: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
                title: '',
              },
              Time: {
                time: '',
                timeType: '',
              },
              Robot: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
                title: '',
              },
              Cleaner: {
                title: '',
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
              },
            },
            errors: {},
            touched: {},
            isSubmitting: false,
            isValidating: false,
            submitCount: 0,
            initialValues: {
              add: {
                list: [
                  {
                    operaType: 'AND',
                    deviceType: null,
                    deviceList: null,
                    status: null,
                  },
                ],
                title: '',
              },
              Condition: {
                list: [],
              },
              DeviceStatus: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
              },
              Time: {
                time: '',
              },
              Robot: {
                list: [
                  {
                    operaType: 'AND',
                  },
                ],
              },
              Cleaner: {
                title: '',
                list: [{}],
              },
            },
            initialErrors: {},
            initialTouched: {},
            isValid: true,
            dirty: true,
            validateOnBlur: true,
            validateOnChange: true,
            validateOnMount: false,
          },
        },
      ],
      key: '2',
      title: '44',
      canAdd: '1',
      type: 'Condition',
    },
    children: [
      {
        id: '2-0',
        type: 'custom-condiction-children',
        data: {
          key: '2-0',
          title: '',
          canAdd: 'add',
          type: 'Normal',
        },
        children: [],
        title: '',
        canAdd: 'add',
      },
    ],
    title: '44',
    canAdd: '1',
  },
]
