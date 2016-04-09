using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using Dapper;
using Xeromatic.Models;

namespace Xeromatic.Services
{
    public class TweetDbService : ITwitterService
    {
        private readonly string _connectionString = ConfigurationManager.ConnectionStrings["tweetDB"].ConnectionString;

        public IEnumerable<Tweet> GetTweets()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return connection.Query<Tweet>(@"SELECT Id, Text FROM dbo.Tweet");
            }
        }

        public void InsertTweet(Tweet tweet)
        {
            // TODO Hint: check out the Dapper docs online. https://github.com/StackExchange/dapper-dot-net
        }
    }
}