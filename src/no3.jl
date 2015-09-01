#=!
حلقه های تکرار در زبان Julia از دو نوع for , while میباشند
!=#
i = 0;
while i <= 4
  print(i) # => 01234
  i += 1
end
for j = 5:9
  print(j) # => 56789
end

#=!
در زبان julia حلقه for هر شیئ شمردنی را شمارش میکند و به ازای هر مقدار جدید از شیئ شمردنی، کدهای بلوک for را اجرا مینماید
!=#
println(typeof(5:9)) # => UnitRange{Int32}
#=!
نوع داده Range تنها یکی از انواع داده شمردنی است
در حقیقت داده های شمردنی متنوعی در زبان Julia وجود دارد هر شیئی که حداقل 3 تابع start, done و next بر آن تعریف شده باشد، در حلقه for قابل شمارش است
!=#
itr = 5:9
state = start(itr) # => 5
while (!done(itr, state))
  item, state = next(itr, state)
  print(item) # => 56789
end
#=!
برنامه نویس میتواند اشیاء شمردنی خود را تولید نماید 
نوع داده Squares، شمردنی است:
!=#
immutable Squares
  count::Int
end
Base.start(::Squares) = 1
Base.next(S::Squares, state) = (state*state, state+1)
Base.done(S::Squares, s) = s > S.count;
for s in Squares(4)
  print(s,',') # => 1,4,9,16,
end
#=!
توابع کاربردی دیگری نیز جهت کار با شمردنی ها (Iterabl) تعریف شده که مجموعه این توابع واسط شمارش را تشکیل میدهند (Iteration Interface).
14 شیئ داخلی در زبان جولیا وجود دارد که کلیه توابع مذکور برای آنان نوشته شده اند.
http://julia.readthedocs.org/en/latest/stdlib/collections/#stdlib-collections-iteration 
دربخشهای مختلفی از زبان جولیا برنامه نویسان با بکارگیری انواع داده های شمردنی در زمان اجرای برنامه یا حافظه مصرفی صرفجویی میکنند، به عنوان مثال مطالعه نمایید:
http://slendermeans.org/julia-iterators.html
در محاسبه جایگشت (Permutation)، یا همان ترتیبهای یک مجموعه نیز از انواع شمردنی داده استفاده شده است بنابر این در حلقه for میتوان آنرا شمرد
!=#
itr = permutations("ABC"); 
for item in itr
  print(item,',') # => ABC,ACB,BAC,BCA,CAB,CBA,
end
