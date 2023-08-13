insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at) 
values 
  ('00000000-0000-0000-0000-000000000000', '1818da01-dd2f-4b34-a3f9-27ef1d78e556', 'authenticated', 'authenticated', 'user1@example.com', '$2a$10$AUonZWwXFYCEPO6T0XKZm.9gMBGDDMLuIk.ZzQ1cJmGzGDKSGURPa', '2023-04-22 13:10:31.463703+00', NULL, '', NULL, '', '2023-04-22 13:10:03.275387+00', '', '', NULL, '2023-04-22 13:10:31.458239+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2022-10-04 03:41:27.391146+00', '2023-04-22 13:10:31.463703+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL),
  ('00000000-0000-0000-0000-000000000000', '36924e4d-f1cc-4e07-a98a-095b859a99c2', 'authenticated', 'authenticated', 'user2@example.com', '$2a$10$AUonZWwXFYCEPO6T0XKZm.9gMBGDDMLuIk.ZzQ1cJmGzGDKSGURPa', '2023-04-22 13:10:31.463703+00', NULL, '', NULL, '', '2023-04-22 13:10:03.275387+00', '', '', NULL, '2023-04-22 13:10:31.458239+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2022-10-04 03:41:27.391146+00', '2023-04-22 13:10:31.463703+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL)
on conflict (id)
  do nothing;

insert into auth.identities (id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at) 
values 
  ('1818da01-dd2f-4b34-a3f9-27ef1d78e556', '1818da01-dd2f-4b34-a3f9-27ef1d78e556'::uuid, '{"sub": "1818da01-dd2f-4b34-a3f9-27ef1d78e556"}', 'email', '2023-04-22 13:10:31.458239+00', '2022-10-04 03:41:27.391146+00', '2023-04-22 13:10:31.463703+00'),
  ('36924e4d-f1cc-4e07-a98a-095b859a99c2', '36924e4d-f1cc-4e07-a98a-095b859a99c2'::uuid, '{"sub": "36924e4d-f1cc-4e07-a98a-095b859a99c2"}', 'email', '2023-04-22 13:10:31.458239+00', '2022-10-04 03:41:27.391146+00', '2023-04-22 13:10:31.463703+00')
on conflict (id, provider)
  do nothing;
insert into users (id, email) 
values
  ('1818da01-dd2f-4b34-a3f9-27ef1d78e556', 'user1@example.com'),
  ('36924e4d-f1cc-4e07-a98a-095b859a99c2', 'user2@example.com');
  