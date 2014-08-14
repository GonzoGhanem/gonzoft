#################################
def FizzBuzz 
  (1..100).each do |value| 
    value_to_show = value
    
    if(value%3 == 0) 
      value_to_show = "Fizz"
      if(value%5 == 0)
        value_to_show << "Buzz"
      end
    elsif(value%5 == 0)
      value_to_show = "Buzz"
    end

    puts value_to_show
  end
end


###############################
def case_permutations(string)
  chars = string
  $chars_size = chars.length
  $total_combinations = 2**$chars_size
  $permutations_index = 0

  while $permutations_index < $total_combinations do 
    permutations = ""
    $char_index = $chars_size

    chars.each_char do |letter|
      $letter_index = $chars_size - $char_index
      binary_number = $permutations_index.to_s(2)
      binary_number_size = binary_number.length
      zeros_to_add = $chars_size - binary_number_size

      zeros_to_add.times do 
        binary_number = '0' << binary_number 
      end

      if(binary_number[$letter_index] == '1')
        letter = letter.upcase
      end

      permutations << letter
      $char_index -= 1
    end
    puts "#{$permutations_index+1}. #{permutations}"
    $permutations_index += 1
  end
end



###############################
def case_permutations_2(string)
  chars = string
  $chars_size = chars.length
  $total_combinations = 2**$chars_size
  $permutations_index = 0
  
  $total_combinations.times do
    $chars_index = $chars_size
    chars.each_char do |letter|
      $chars_index -= 1x
      if(is_upper_case(letter, $chars_index, chars ))
        letter = letter.upcase
      end
      
    end 
    puts "#{$permutations_index+1}. #{chars}"  
    $permutations_index += 1
  end
end

def is_upper_case(letter, index, string)
  puts "Letter: #{letter}, Index: #{index}, String: #{string}"
end

begin
  test_string = "abc"
  #FizzBuzz()
  #case_permutations(test_string)
  case_permutations_2(test_string)
end



