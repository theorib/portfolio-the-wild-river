import { LogLayer } from 'loglayer'
import { sprintfPlugin } from '@loglayer/plugin-sprintf'
import { redactionPlugin } from '@loglayer/plugin-redaction'
import { Logger } from 'tslog'
import { TsLogTransport } from '@loglayer/transport-tslog'

const tslog = new Logger({
  hideLogPositionForProduction: true,
  maskPlaceholder: '[REDACTED]',
  maskValuesOfKeys: ['password'],
})

const logger = new LogLayer({
  contextFieldName: 'context',
  enabled: true,
  metadataFieldName: 'metadata',
  errorFieldName: 'error',
  copyMsgOnOnlyError: true,
  // transport: new ConsoleTransport({
  //   logger: console,
  //   enabled: true,
  //   appendObjectData: true,
  // }),
  transport: new TsLogTransport({
    logger: tslog,
  }),
  plugins: [
    sprintfPlugin(),
    redactionPlugin({
      paths: [
        'password',
        'loginFormData.password',
        'SUPABASE_ANON_KEY',
        'env.SUPABASE_ANON_KEY',
        'supabaseData.user.id',
        'supabaseData.user.id',
        'supabaseData.user.user_metadata.sub',
        'supabaseData.user.identities[*].identity_id',
        'supabaseData.user.identities[*].id',
        'supabaseData.user.identities[*].user_id',
        'supabaseData.user.identities[*].identity_data.sub',
        'supabaseData.session.access_token',
        'supabaseData.session.refresh_token',
        'supabaseData.session.user.id',
        'supabaseData.session.user.user_metadata.sub',
        'supabaseData.session.user.identities[*].user_id',
        'supabaseData.session.user.identities[*].identity_data',
      ],
      censor: '[REDACTED]',
    }),
  ],
})

export default logger
