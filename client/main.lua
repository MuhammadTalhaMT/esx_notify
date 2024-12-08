if GetResourceState('es_extended') ~= 'started' then return end

RegisterCommand('nsuccess', function()
    ESX.ShowNotification('Test Success Notification!', 'success', 3000)
end)

RegisterCommand('nerror', function()
    ESX.ShowNotification('Test ~r~Error~s~ Notification!', 'error', 3000)
end)

RegisterCommand('ninfo', function()
    ESX.ShowNotification('Test ~b~Info~s~ Notification!', 'info', 3000)
end)

-- Test with longer text
RegisterCommand('nlong', function()
    ESX.ShowNotification('This is a longer notification message to test how the system handles multiple lines of text!', 'info', 5000)
end)

-- Test with color formatting
RegisterCommand('ncolor', function()
    ESX.ShowNotification('~r~Red ~b~Blue ~g~Green ~y~Yellow ~p~Purple ~c~Grey ~o~Orange~s~', 'info', 5000)
end) 