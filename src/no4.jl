#=!
جولیا به عنوان یک زبان تخصصی انجام محاسبات، توابع متنوعی در موضوع محاسبات آماری (statistics) را تعریف و در اختیار کاربر قرار میدهد
علاوه بر این توابع پایه، مجموعه کاملتری از قابلیت ها در پکیجهای جانبی جولیا تعریف شده اند، فهرست مهمترین پکیجهای تخصصی ی آمار و احتمالات را میتوان با مراجعه به آدرس https://github.com/JuliaStats دریافت نمود. 
در ارائه مثالهای این یادداشت فرض براین است که خواننده از نحوه کار با 1- بردارها و آرایه ها در جولیا و 2- ماکروهای تست (Unit and Functional Testing) اطلاع دارد.
!=#

#=!
داده های آماری را بصورت برداری از اعداد تصادفی تولید مینماییم
!=#
using Base.Test #=> مجموعه توابع تست استفاده گردند
randomdata = rand(100); #=> 100-element Array{Float64,1}
meanval = mean(randomdata) #=> تابع mean مقدار متوسط داده ها را محاسبه میکند
@test_approx_eq meanval sum(randomdata)/length(randomdata)
varval = std(randomdata) #=> تابع var وارینس داده ها را محاسبه میکند 
@test_approx_eq varval sum((randomdata - meanval).^2) / (length(randomdata) - 1)
stdval = std(randomdata) #=> تابع std انحراف از معیار داده های را محاسبه میکند 
@test_approx_eq stdval sqrt(varval)
midval = middle(randomdata) #=> تابع middle مقدار میانی را محاسبه میکند
@test_approx_eq midval (max(randomdata)-min(randomdata))/2 
