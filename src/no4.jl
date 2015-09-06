#=!
جولیا به عنوان یک زبان تخصصی انجام محاسبات، توابع متنوعی در موضوع محاسبات آماری (statistics) را تعریف و در اختیار کاربر قرار میدهد
علاوه بر این توابع پایه، مجموعه کاملتری از قابلیت ها در پکیجهای جانبی جولیا تعریف شده اند، فهرست مهمترین پکیجهای تخصصی ی آمار و احتمالات را میتوان با مراجعه به آدرس https://github.com/JuliaStats دریافت نمود. 
در ارائه مثالهای این یادداشت فرض براین است که خواننده از نحوه کار با 1- بردارها و آرایه ها در جولیا و 2- ماکروهای تست (Unit and Functional Testing) اطلاع دارد.
!=#
using Base.Test
#=!
داده های آماری را بصورت برداری از اعداد تصادفی تولید مینماییم
!=#
randomdata = rand(100); # => 100-element Array{Float64,1}
#=!
تابع mean مقدار متوسط داده ها را محاسبه میکند
!=#
meanval = mean(randomdata) 
@test_approx_eq meanval sum(randomdata)/length(randomdata)
#=!
تابع var وارینس داده ها را محاسبه میکند 
!=#
varval = var(randomdata) 
@test_approx_eq varval sum((randomdata - meanval).^2) / (length(randomdata) - 1)
#=!
تابع std انحراف از معیار داده های را محاسبه میکند
!=#
stdval = std(randomdata)
@test_approx_eq stdval sqrt(varval)
#=!
تابع middle مقدار میانی را محاسبه میکند
!=#
midval = middle(randomdata) 
@test_approx_eq midval (maximum(randomdata)+minimum(randomdata))/2