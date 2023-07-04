import { setupWorker, rest } from 'msw'

const worker = setupWorker(
  rest.get('/v1', (req, res, ctx) => {
    const category = req.url.searchParams.get('category')
    const sort = req.url.searchParams.get('sort')
    const pageIndex = req.url.searchParams.get('pageIndex')
    const pageSize = req.url.searchParams.get('pageSize')

    return res(
      ctx.json([
        {
          questionId: 6,
          title: 'test2',
          answerCount: 0,
          category: 'minishell',
          recommend: 0,
          view: 0,
          nickname: 'test nick2',
          createdAt: '2023-07-02T15:02:59.802146',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae sem non ligula pellentesque fringilla. Mauris sed justo urna.',
        },
        {
          questionId: 1,
          title: 'IRC 우웩',
          answerCount: 0,
          category: 'ft_irc',
          recommend: 5,
          view: 4,
          nickname: 'test nick2',
          createdAt: '2023-07-02T15:02:08.883533',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae sem non ligula pellentesque fringilla. Mauris sed justo urna.',
        },
        {
          questionId: 2,
          title: 'How to use the minishell?',
          answerCount: 2,
          category: 'minishell',
          recommend: 10,
          view: 12,
          nickname: 'user123',
          createdAt: '2023-06-30T10:15:47.192831',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae sem non ligula pellentesque fringilla. Mauris sed justo urna.',
        },
        {
          questionId: 3,
          title: 'minirt commands for file manipulation',
          answerCount: 1,
          category: 'minirt',
          recommend: 3,
          view: 8,
          nickname: 'shellMaster',
          createdAt: '2023-06-29T16:45:12.543987',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae sem non ligula pellentesque fringilla. Mauris sed justo urna.',
        },
        {
          questionId: 4,
          title: 'Troubleshooting minishell installation issues',
          answerCount: 3,
          category: 'minishell',
          recommend: 7,
          view: 15,
          nickname: 'shellUser99',
          createdAt: '2023-06-28T09:30:22.982613',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae sem non ligula pellentesque fringilla. Mauris sed justo urna.',
        },
      ]),
    )
  }),
)

worker.start()
