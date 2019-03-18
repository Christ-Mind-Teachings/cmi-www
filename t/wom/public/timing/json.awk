/var cmi/ {
  print "{"
  next
}
/};/ {
  print "}"
  next
}
/title": / {
  next
}
{
  print $0
}

